function showAlert(message, type = 'success', duration = 5000, isMainScreen = false) {
  const alertContainer = document.getElementById('auth-alert');
  alertContainer.classList.add('notifications');

  const STACKING_OVERLAP = 0.9;
  const existingAlerts = alertContainer.getElementsByClassName('custom-alert');
  var total = existingAlerts.length
  
  for (let i = 0; i < total && i < 4; i++) {
    const cAlert = existingAlerts[i];
    const inverseIndex = (total - i) + 1;
    const scale = 1 - inverseIndex * 0.05;
    opacity = 1 - (inverseIndex / total) * 0.1;

    const bg = `hsl(0 0% ${100 - inverseIndex * 15}% / 40%)`;
    const y = ((inverseIndex -1) * 100 * STACKING_OVERLAP);

    cAlert.style.setProperty('--bg', bg);
    cAlert.style.setProperty('--scale', scale);
    cAlert.style.setProperty('--y', `${y}%`);
    cAlert.style.setProperty('--opacity', opacity);
    cAlert.style.setProperty('border-width', '0px');
  }

  if( total == 4 ){
    existingAlerts[0].remove()
  }

  const inverseIndex = 0;
  const scale = 1 - inverseIndex * 0.05;
  var opacity = 1

  const bg = `hsl(0 0% ${100 - inverseIndex * 15}% / 40%)`;
  const y = 0;

  const customAlert = document.createElement('div');
  customAlert.classList.add('custom-alert', 'alert', 'alert-dismissible', 'fade', 'show', 'notification', 'enter-done');
  customAlert.style.setProperty('--bg', bg);
  customAlert.style.setProperty('--scale', scale);
  customAlert.style.setProperty('--y', `${y}%`);
  customAlert.style.setProperty('--opacity', opacity);
  customAlert.style.setProperty('border-width', '0px');


  customAlert.innerHTML = `
    <div class="notification-inner">
      <div class="tick-box mr-3" style="padding-bottom: 8px;">
        <img src=${type === 'success' ? '../../assets/img/icons/success_alert_icon.svg' : "../../assets/img/icons/error_alert_icon.svg"} width="35" alt="" />
      </div>
      <div class="alert-content">
        <div class="alert-icon">
          <h6 style="color: black; margin-top: 8px; margin-bottom: 0">${type === 'success' ? 'Success' : 'Error'}</h6>
        </div>
        <div class="alert-text">
          <p style="color: black; margin-top: 0;">${message}</p>
        </div>
      </div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" style="font-weight: normal;">&times;</span>
      </button>
    </div>
  `;

  alertContainer.append(customAlert);
  
  // Automatically close the alert after the specified duration
  setTimeout(function () {
    customAlert.classList.remove('show');
    setTimeout(function () {
      customAlert.remove();
    }, 3000); // Assumes a 1-second Bootstrap fade transition
  }, duration);
}
