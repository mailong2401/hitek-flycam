import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Settings, Download } from "lucide-react"
import { useState } from "react"

export default function ChatBotManagement() {
  const [trainingData, setTrainingData] = useState("")
  const [responses, setResponses] = useState<Array<{question: string, answer: string}>>([
    { question: "Xin chào", answer: "Chào bạn! Tôi có thể giúp gì cho bạn?" },
    { question: "Bạn có dịch vụ gì?", answer: "Chúng tôi có các dịch vụ về drone: sửa chữa, khảo sát, quay phim, xin giấy phép bay..." },
  ])

  const addResponse = () => {
    setResponses([...responses, { question: "", answer: "" }])
  }

  const updateResponse = (index: number, field: 'question' | 'answer', value: string) => {
    const newResponses = [...responses]
    newResponses[index][field] = value
    setResponses(newResponses)
  }

  const removeResponse = (index: number) => {
    setResponses(responses.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Chatbot</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Cài đặt Chatbot
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Câu hỏi thường gặp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {responses.map((response, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Câu hỏi
                      </label>
                      <Input
                        value={response.question}
                        onChange={(e) => updateResponse(index, 'question', e.target.value)}
                        placeholder="Nhập câu hỏi..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Câu trả lời
                      </label>
                      <Input
                        value={response.answer}
                        onChange={(e) => updateResponse(index, 'answer', e.target.value)}
                        placeholder="Nhập câu trả lời..."
                      />
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeResponse(index)}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              
              <Button onClick={addResponse} variant="outline" className="w-full">
                Thêm câu hỏi mới
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dữ liệu training</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Dữ liệu training (JSON)
                </label>
                <textarea
                  className="w-full h-64 p-3 border rounded-md font-mono text-sm"
                  value={trainingData}
                  onChange={(e) => setTrainingData(e.target.value)}
                  placeholder='[
  {
    "question": "Xin chào",
    "answer": "Chào bạn! Tôi có thể giúp gì?"
  }
]'
                />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">Train Chatbot</Button>
                <Button variant="outline" className="flex-1">
                  Test Chatbot
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lịch sử trò chuyện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Chưa có lịch sử trò chuyện</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}