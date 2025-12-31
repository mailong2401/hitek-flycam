export async function sendContactEmail(formData) {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }

    const functionUrl = `${supabaseUrl}/functions/v1/send-contact-email`

    const response = await fetch(functionUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify(formData)
    })

    const responseText = await response.text()

    let result
    try {
      result = JSON.parse(responseText)
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`)
    }

    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}: ${responseText}`)
    }

    return { success: true, data: result }

  } catch (error) {
    return {
      success: false,
      error: error.message,
      rawError: error
    }
  }
}