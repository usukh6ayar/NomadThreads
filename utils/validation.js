export const validate = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: regex.test(email),
      message: regex.test(email) ? "" : "И-мэйл хаяг буруу байна",
    };
  },

  password: (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;

    return {
      isValid,
      message: isValid
        ? ""
        : "Нууц үг дор хаяж 8 тэмдэгт, том, жижиг үсэг, тоо агуулсан байх ёстой",
    };
  },

  phone: (phone) => {
    const regex = /^[0-9]{8}$/;
    return {
      isValid: regex.test(phone),
      message: regex.test(phone) ? "" : "Утасны дугаар 8 оронтой байх ёстой",
    };
  },
};
