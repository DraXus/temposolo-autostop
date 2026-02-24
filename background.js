const IDLE_DETECTION_INTERVAL = 15;

chrome.idle.setDetectionInterval(IDLE_DETECTION_INTERVAL);

chrome.idle.onStateChanged.addListener((newState) => {
  console.log(`Idle state changed to: ${newState}`);
  
  if (newState === 'locked') {
    console.log('Computer locked - attempting to stop timer');
    stopTimerOnAllTabs();
  }
});

chrome.runtime.onSuspend.addListener(() => {
  console.log('Extension suspending (shutdown/restart) - attempting to stop timer');
  stopTimerOnAllTabs();
});

async function stopTimerOnAllTabs() {
  try {
    const tabs = await chrome.tabs.query({
      url: 'https://temposolo.es/timer*'
    });
    
    console.log(`Found ${tabs.length} Temposolo timer tab(s)`);
    
    for (const tab of tabs) {
      try {
        await chrome.tabs.sendMessage(tab.id, { action: 'stopTimer' });
        console.log(`Sent stop message to tab ${tab.id}`);
      } catch (error) {
        console.error(`Failed to send message to tab ${tab.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error querying tabs:', error);
  }
}
