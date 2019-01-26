
document.addEventListener('DOMContentLoaded', function(){
  let toggleButton = document.getElementById('mtgGuildColorsToggle');
  let hiddenInput = document.getElementById('mtgGuildColorsInput');
  let img = document.getElementById('mtgGuildColorsImg');

  chrome.storage.sync.get('mtgGuildColorsEnabled', function(data) {
    if(data.mtgGuildColorsEnabled){
      img.classList.remove('filter-red');
      img.classList.add('filter-green');
    }else{
      img.classList.remove('filter-green');
      img.classList.add('filter-red');
    }
    hiddenInput.setAttribute('value', data.mtgGuildColorsEnabled);
  });

  toggleButton.onclick = function(element) {
    let input = document.getElementById('mtgGuildColorsInput');
    let currentState = input.value == 'true' || input.value == true ? true : false;
    console.log('Current state is: ', currentState);

    let newState = !currentState;

    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.executeScript(
    //       tabs[0].id,
    //       {code: 'document.body.style.backgroundColor = "' + color + '";'}
    //     );
    // });

    chrome.storage.sync.set({mtgGuildColorsEnabled: newState}, function() {
      console.log('New state is ' + newState);
      input.setAttribute('value', newState);
      if(newState){
        img.classList.remove('filter-red');
        img.classList.add('filter-green');
      }else{
        img.classList.remove('filter-green');
        img.classList.add('filter-red');
      }
    });
  };

});


