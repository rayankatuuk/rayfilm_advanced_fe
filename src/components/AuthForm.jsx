import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';

const AuthForm = ({
  formData,
  onInputChange,
  onSubmit,
  isLoading,
  submitButtonText,
  alternateLinkText,
  alternateLinkPath,
  alternateLinkLabel,
  showForgotPassword = true,
  showGoogleAuth = true,
  googleAuthText,
  fields = []
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {fields.map((field, index) => {
        if (field.type === 'password') {
          return (
            <PasswordInput
              key={index}
              id={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={onInputChange}
              required={field.required}
            />
          );
        } else {
          return (
            <FormInput
              key={index}
              id={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={onInputChange}
              required={field.required}
            />
          );
        }
      })}

      <div className="flex justify-between text-xs sm:text-sm mb-4 sm:mb-6">
        <Link to={alternateLinkPath} className="text-gray-400 hover:underline">
          {alternateLinkText} <span className="text-gray-200">{alternateLinkLabel}</span>
        </Link>
        {showForgotPassword && (
          <button type="button" className="text-gray-200 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer">
            Lupa kata sandi?
          </button>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-main hover:bg-purple-700 text-white py-2 border border-gray-400 rounded-full transition text-sm sm:text-base"
        >
          {isLoading ? 'Loading...' : submitButtonText}
        </button>
      </div>

      {showGoogleAuth && (
        <>
          <div className="text-center text-xs sm:text-sm text-gray-300 my-3 sm:my-4">Atau</div>
          <button className="w-full flex justify-center items-center gap-1 sm:gap-2 md:gap-4 border border-gray-400 text-gray-200 py-2 rounded-full shadow-md hover:bg-gray-700 transition text-sm sm:text-base">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4 sm:w-5 sm:h-5" />
            {googleAuthText}
          </button>
        </>
      )}
    </form>
  );
};

export default AuthForm; 