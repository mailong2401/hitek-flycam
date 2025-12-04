// components/contact/FormStatus.tsx
interface FormStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error';
}

const FormStatus = ({ status }: FormStatusProps) => {
  if (status === 'idle' || status === 'loading') return null;

  if (status === 'success') {
    return (
      <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
        ✅ Gửi thành công! Chúng tôi sẽ liên hệ lại sớm và đã gửi email xác nhận cho bạn.
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
        ❌ Có lỗi xảy ra, vui lòng thử lại hoặc liên hệ trực tiếp qua số điện thoại.
      </div>
    );
  }

  return null;
};

export default FormStatus;
