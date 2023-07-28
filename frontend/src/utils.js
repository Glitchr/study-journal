// Validate each form field before sending the request
export const validateSignUpForm = (
    username,
    email,
    password,
    passwordConfirmation,
) => {
    let isValid = true;
    let errors = {
        username: '',
        email: '',
        password: '',
    };

    if (!username) {
        isValid = false;
        errors.username = 'El campo de usuario está vacío.';
    }

    if (!email) {
        isValid = false;
        errors.email = 'El campo de correo está vacío.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        errors.email = 'El correo ingresado no es válido.';
    }

    if (!password) {
        isValid = false;
        errors.password = 'El campo de contraseña está vacío.';
    } else if (password.length < 8) {
        isValid = false;
        errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!passwordConfirmation) {
        isValid = false;
        errors.passwordConfirmation = 'El campo de confirmar contraseña está vacío.';
    } else if (password !== passwordConfirmation) {
        isValid = false;
        errors.passwordConfirmation = 'Las contraseñas no coinciden.';
    }

    return { isValid, errors };
}


export const validateLoginForm = (
    username,
    password,
) => {
    let isValid = true;
    let errors = {
      username: '',
      password: '',
    };
  
    if (!username) {
      isValid = false;
      errors.username = 'El campo de usuario está vacío.';
    }
  
    if (!password) {
      isValid = false;
      errors.password = 'El campo de contraseña está vacío.';
    }

    return { isValid, errors };
  }

export const secondsToHms = (d) => {
    // Convert seconds to hh:mm:ss format
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";

    return hDisplay + mDisplay + sDisplay; 
  }
