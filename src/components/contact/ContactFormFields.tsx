// components/contact/ContactFormFields.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData } from "@/types/contact";
import { useEffect, useRef } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactFormFieldsProps {
  formData: ContactFormData;
  errors: {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    location: string;
    message: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onValidateField: (fieldName: string, value: string) => void;
}

const ContactFormFields = ({ 
  formData, 
  errors, 
  onChange, 
  onSelectChange,
  onValidateField 
}: ContactFormFieldsProps) => {
  const { t } = useLanguage();
  
  // Refs để lưu timeout cho từng trường
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Dữ liệu cho combobox dịch vụ
  const serviceOptions = [
    { value: '', label: t<string>("contact.form.serviceOptions.default") },
    { value: 'droneRepair', label: t<string>("contact.form.serviceOptions.droneRepair") },
    { value: 'droneFilming', label: t<string>("contact.form.serviceOptions.droneFilming") },
    { value: 'surveyingDrone', label: t<string>("contact.form.serviceOptions.surveyingDrone") },
    { value: 'deliveryDrone', label: t<string>("contact.form.serviceOptions.deliveryDrone") },
    { value: 'flightPermit', label: t<string>("contact.form.serviceOptions.flightPermit") },
    { value: 'droneImport', label: t<string>("contact.form.serviceOptions.droneImport") },
    { value: 'khac', label: t<string>("contact.form.serviceOptions.other") }
  ];

  // Hàm xử lý thay đổi với validation debounced
  const handleChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    // KHÔNG filter gì cả - cho phép mọi ký tự
    if (name === 'name') {
      newValue = value;
    }
    
    // Xử lý tự động format số điện thoại
    if (name === 'phone') {
      // Loại bỏ tất cả ký tự không phải số
      const numbers = value.replace(/\D/g, '');
      
      // Nếu bắt đầu bằng 84, giữ nguyên 84
      if (numbers.startsWith('84')) {
        newValue = numbers;
      } 
      // Nếu bắt đầu bằng 0, giữ nguyên 0
      else if (numbers.startsWith('0')) {
        newValue = numbers;
      }
      // Nếu không bắt đầu bằng gì cả nhưng có số
      else if (numbers) {
        newValue = '0' + numbers;
      } else {
        newValue = '';
      }
    }
    
    // Gọi onChange callback
    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: newValue
      }
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);

    // Debounced validation
    debouncedValidate(name, newValue);
  };

  // Hàm xử lý thay đổi select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e);
    // Validation ngay lập tức cho select
    onValidateField(e.target.name, e.target.value);
  };

  // Hàm debounce validation
  const debouncedValidate = (fieldName: string, value: string) => {
    // Clear timeout cũ nếu có
    if (timeoutsRef.current[fieldName]) {
      clearTimeout(timeoutsRef.current[fieldName]);
    }

    // Nếu trường rỗng và chưa có giá trị trước đó, không cần debounce
    if (!value.trim()) {
      onValidateField(fieldName, value);
      return;
    }

    // Set timeout mới cho validation sau 200ms
    timeoutsRef.current[fieldName] = setTimeout(() => {
      onValidateField(fieldName, value);
    }, 200);
  };

  // Cleanup timeouts khi component unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <div className="space-y-2">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t<string>("contact.form.fields.name.label")}
        </label>
        <Input 
          name="name"
          placeholder={t<string>("contact.form.fields.name.placeholder")} 
          value={formData.name}
          onChange={handleChangeWithValidation}
          required
          className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'placeholder:text-gray-400'}
          maxLength={50}
        />
        <div className="flex justify-between items-center">
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
          <span className="text-xs text-muted-foreground mt-1 ml-auto">
            {formData.name.length}{t<string>("contact.form.fields.name.counter")}
          </span>
        </div>
      </div>
      
      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t<string>("contact.form.fields.company.label")}
        </label>
        <Input 
          name="company"
          placeholder={t<string>("contact.form.fields.company.placeholder")} 
          value={formData.company}
          onChange={handleChangeWithValidation}
          className={errors.company ? 'border-red-500 focus-visible:ring-red-500' : 'placeholder:text-gray-400'}
          maxLength={100}
        />
        <div className="flex justify-between items-center">
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company}</p>
          )}
          <span className="text-xs text-muted-foreground mt-1 ml-auto">
            {formData.company.length}{t<string>("contact.form.fields.company.counter")}
          </span>
        </div>
      </div>
      
      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t<string>("contact.form.fields.email.label")}
          </label>
          <Input 
            name="email"
            type="email" 
            placeholder={t<string>("contact.form.fields.email.placeholder")} 
            value={formData.email}
            onChange={handleChangeWithValidation}
            required
            className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'placeholder:text-gray-400'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t<string>("contact.form.fields.phone.label")}
          </label>
          <Input 
            name="phone"
            type="tel" 
            placeholder={t<string>("contact.form.fields.phone.placeholder")} 
            value={formData.phone}
            onChange={handleChangeWithValidation}
            required
            className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : 'placeholder:text-gray-400'}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Service & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t<string>("contact.form.fields.service.label")}
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleSelectChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {serviceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t<string>("contact.form.fields.location.label")}
          </label>
          <Input 
            name="location"
            placeholder={t<string>("contact.form.fields.location.placeholder")} 
            value={formData.location}
            onChange={handleChangeWithValidation}
            className={errors.location ? 'border-red-500 focus-visible:ring-red-500' : 'placeholder:text-gray-400'}
            maxLength={100}
          />
          <div className="flex justify-between items-center">
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
            <span className="text-xs text-muted-foreground mt-1 ml-auto">
              {formData.location.length}{t<string>("contact.form.fields.location.counter")}
            </span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t<string>("contact.form.fields.message.label")}
        </label>
        <Textarea
          name="message"
          placeholder={t<string>("contact.form.fields.message.placeholder")}
          rows={3}
          value={formData.message}
          onChange={handleChangeWithValidation}
          required
          className={errors.message ? 'border-red-500 focus-visible:ring-red-500' : 'placeholder:text-gray-400'}
          maxLength={1000}
        />
        <div className="flex justify-between items-center">
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
          <span className="text-xs text-muted-foreground mt-1 ml-auto">
            {formData.message.length}{t<string>("contact.form.fields.message.counter")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactFormFields;