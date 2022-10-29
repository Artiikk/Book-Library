import Toastify from 'toastify-js'

export const getNotification = ({
  message,
  variant = 'error',
  duration = 5000
}) => {
  let background

  if (variant === 'error') background = '#ff5252'
  if (variant === 'success') background = '#03c04a'
  if (variant === 'warning') background = '#ff8800'
  if (variant === 'info') background = '#0099cc'

  Toastify({
    duration,
    text: message,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background,
      color: '#fff',
      position: 'fixed',
      bottom: 0,
      right: 0,
      width: 'fit-content',
      height: 'fit-content',
      zIndex: 9999,
      padding: '20px',
      margin: '20px',
      borderRadius: '10px'
    }
  }).showToast()
}