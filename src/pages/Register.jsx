import { useState } from 'react';
import { AuthCard, AuthForm } from '../components';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }
    
    setIsLoading(true);
      setTimeout(() => {
      setIsLoading(false);
      alert('Registrasi berhasil! Silahkan login.');
      window.location.href = '/login';
    }, 2000);
  };

  // Konfigurasi field untuk form register
  const registerFields = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Pilih username',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      label: 'Kata Sandi',
      placeholder: 'Masukkan kata sandi',
      required: true
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Konfirmasi Kata Sandi',
      placeholder: 'Konfirmasi kata sandi',
      required: true
    }
  ];

  return (
    <AuthCard 
      title="Daftar" 
      subtitle="Selamat datang!!"
    >
      <AuthForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitButtonText="Daftar"
        alternateLinkText="Sudah punya akun?"
        alternateLinkPath="/login"
        alternateLinkLabel="Masuk"
        showForgotPassword={false}
        showGoogleAuth={true}
        googleAuthText="Daftar dengan Google"
        fields={registerFields}
      />
    </AuthCard>
  );
};

export default Register;
