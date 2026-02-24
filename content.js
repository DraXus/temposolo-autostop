chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'stopTimer') {
    console.log('Received stop timer message');
    stopTimer();
    sendResponse({ success: true });
  }
  return true;
});

function stopTimer() {
  try {
    const timerStateStr = localStorage.getItem('timetracker-timer-state');
    
    if (!timerStateStr) {
      console.log('No timer state found in localStorage');
      return;
    }
    
    const timerState = JSON.parse(timerStateStr);
    console.log('Current timer state:', timerState);
    
    if (!timerState.running) {
      console.log('Timer is not running, nothing to stop');
      return;
    }
    
    console.log('Timer is running, attempting to stop it');
    
    const buttons = Array.from(document.querySelectorAll('button'));
    const stopButton = buttons.find(button => 
      button.innerText.includes('Detener') || 
      button.innerText.includes('Parar') ||
      button.innerText.includes('Stop')
    );
    
    if (stopButton) {
      console.log('Found stop button, clicking it');
      stopButton.click();
      console.log('Timer stop button clicked successfully');
    } else {
      console.warn('Stop button not found on page');
      
      timerState.running = false;
      localStorage.setItem('timetracker-timer-state', JSON.stringify(timerState));
      console.log('Manually updated localStorage to stop timer');
    }
  } catch (error) {
    console.error('Error stopping timer:', error);
  }
}
