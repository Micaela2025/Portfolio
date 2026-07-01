
function copiarAlPortapapeles(texto) {

  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(texto);
  }

  
  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = texto;
      // Evitar que afecte el layout:
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const exito = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (exito) resolve();
      else reject(new Error('execCommand returned false'));
    } catch (e) {
      reject(e);
    }
  });
}

function configurarBotonEmail() {
  try {
    const usuario = 'sorianomicaela80';
    const dominio = 'gmail';
    const emailCompleto = `${usuario}@${dominio}.com`;

    const boton = document.getElementById('copy-email-btn');
    const mensaje = document.getElementById('copy-message');

    if (!boton) {
      console.error('No se encontró el elemento #copy-email-btn en el DOM.');
      return;
    }
    if (!mensaje) {
      console.error('No se encontró el elemento #copy-message en el DOM.');
      return;
    }

    // Asegurarse que el mensaje esté limpio al iniciar
    mensaje.textContent = '';

    boton.addEventListener('click', () => {
      copiarAlPortapapeles(emailCompleto)
        .then(() => {
          console.log('Email copiado:', emailCompleto);
          mensaje.textContent = '¡Correo copiado!';
          boton.textContent = '¡Copiado!';
          boton.disabled = true;

          // pequeña animación visual: añadir clase si querés (opcional)
          setTimeout(() => {
            mensaje.textContent = '';
            boton.textContent = 'Copiar Correo';
            boton.disabled = false;
          }, 3000);
        })
        .catch(err => {
          console.error('Error al copiar:', err);
          mensaje.textContent = `Error: copialo manualmente: ${emailCompleto}`;
        });
    });
  } catch (err) {
    console.error('Error en configurarBotonEmail:', err);
  }
}

// Usar DOMContentLoaded para garantizar que el DOM esté listo
document.addEventListener('DOMContentLoaded', configurarBotonEmail);



