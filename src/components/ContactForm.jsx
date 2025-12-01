// src/components/ContactForm.jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone as PhoneIcon, Mail, MapPin, Clock } from 'lucide-react';
import { sendContactEmail } from '@/utils/emailService';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('');

    try {
      console.log('🔄 Submitting form...')
      
      // Gửi email qua Supabase Edge Function
      const result = await sendContactEmail(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({ 
          name: '', 
          company: '', 
          email: '', 
          phone: '', 
          service: '', 
          location: '', 
          message: '' 
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('❌ Form submit error:', error)
      setSubmitStatus('error')
    } finally {
      setIsLoading(false)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Gửi tin nhắn
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tên */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Họ và tên *
            </label>
            <Input 
              name="name"
              placeholder="Nhập họ và tên của bạn" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Công ty */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tên công ty
            </label>
            <Input 
              name="company"
              placeholder="Hitek" 
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          
          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <Input 
                name="email"
                type="email" 
                placeholder="email@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Số điện thoại *
              </label>
              <Input 
                name="phone"
                type="tel" 
                placeholder="0123 456 789" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Dịch vụ & Địa điểm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Dịch vụ quan tâm
              </label>
              <Input 
                name="service"
                placeholder="Ví dụ: Sửa chữa drone, Quay flycam..." 
                value={formData.service}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Địa điểm
              </label>
              <Input 
                name="location"
                placeholder="Hồ Chí Minh" 
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Nội dung */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nội dung *
            </label>
            <Textarea
              name="message"
              placeholder="Mô tả chi tiết yêu cầu của bạn..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* Thông báo */}
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              ✅ Gửi thành công! Chúng tôi sẽ liên hệ lại sớm và đã gửi email xác nhận cho bạn.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              ❌ Có lỗi xảy ra, vui lòng thử lại hoặc liên hệ trực tiếp qua số điện thoại.
            </div>
          )}

          {/* Nút gửi */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang gửi...
              </>
            ) : (
              'Gửi tin nhắn'
            )}
          </Button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Thông tin liên hệ
          </h2>
          <div className="space-y-6">
            {/* Hotline */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <PhoneIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Hotline</h3>
                <p className="text-muted-foreground">028 99 95 95 88</p>
                <p className="text-muted-foreground">034 612 4230</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">info@droneservices.vn</p>
                <p className="text-muted-foreground">support@droneservices.vn</p>
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Địa chỉ</h3>
                <p className="text-muted-foreground">Quận 1, Tp. Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>

            {/* Giờ làm việc */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Giờ làm việc</h3>
                <p className="text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                <p className="text-muted-foreground">Thứ 7: 8:00 - 12:00</p>
                <p className="text-muted-foreground">Chủ nhật: Nghỉ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-secondary rounded-2xl h-64 flex items-center justify-center">
          <p className="text-muted-foreground">Bản đồ Google Maps</p>
        </div>
      </div>
    </div>
  )
}