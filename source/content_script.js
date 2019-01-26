chrome.storage.sync.get('mtgGuildColorsEnabled', function(data) {
  if(data.mtgGuildColorsEnabled){
    parsePage();
  }
});

function parsePage(){
	// The 'walk' and 'MutationObserver' code is taken from:
	// https://github.com/Techjar/cloud-to-butt

	walk(document.body);
	// TODO add the colors in text in the document title?
	// document.title = buttify(document.title);

	//Causes issues with some in-page text editors
	var observer = new MutationObserver(function(mutations) {
		mutations.reduce(function(acc, mutation){
			Array.prototype.push.apply(acc, mutation.addedNodes);
			return acc;
		}, []).forEach(walk);
	});
	observer.observe(document.body, {childList: true, subtree: true});
}

function walk(node){
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;
		case 3: // Text node
		  // Make sure we don't overwrite text inputs by checking their `tagName`s
      if(node.parentElement != null && node.parentElement.tagName.toLowerCase() != "script" && node.parentElement.tagName.toLowerCase() != "style" && node.parentElement.tagName.toLowerCase() != "textarea" && node.parentElement.contentEditable != "true" && node.parentElement.tagName.toLowerCase() != "input") {
          handleText(node);
      }
			break;
	}
}

function handleText(textNode) {
	let parentNode = textNode.parentNode;

	// Only want to update the node if it contains the color we're searching for,
	//  otherwise we hit an infinite loop due to MutationObserver.
	// Use regex to add word boundaries when checking for color so that we dont find matches within other words e.g. ink.
	let colors = colorNames();
	let containsColor = false;
	for(let i=0;i<colors.length;i++){
		let curColor = colors[i];
		let re = `\\b(${curColor})\\b`; //need to double-escape the \b
		let regex = new RegExp(re, 'gi');
		if(disabledNames().indexOf(curColor) == -1 && regex.test(textNode.nodeValue.toLowerCase())){
			containsColor = true;
			break;
		}
	}

	// Only update if we haven't already updated it, since otherwise we'd run into an infinite loop due to MutationObserver.
	// 'mtg-guild-clan-extension' id in the img we add is a way to tell if we've already added it
	if(containsColor && !parentNode.innerHTML.includes('mtg-guild-clan-extension')){
		//Make the images a little smaller than the actual font size for readability.
		let fontSize = window.getComputedStyle(textNode.parentNode).getPropertyValue('font-size').slice(0,2);
		fontSize = Number(fontSize) - 4; // TODO make relative fontSize customizable?

		let newHtml = appendColorsToName(parentNode.innerHTML, fontSize);
		parentNode.innerHTML = newHtml;
	}
}

function appendColorsToName(text, fontSize){
	colorNames().forEach((name, index, enumerable) => {
		let re = `\\b(${name})\\b`; //need to double-escape the \b
		let regex = new RegExp(re, 'gi'); //case-insensitive so we don't need to change capitalization
		if(text && disabledNames().indexOf(name) == -1){
			text = text.replace(regex, `$1 ${getColorsFromName(name, fontSize)}`);
		}
	});

	return text;
}

function getColorsFromName(name, fontSize){
	let color = nameToColorMap()[name];
	return convertColorToImage(color, fontSize);
}

function convertColorToImage(color, fontSize){
	var ret = '';
	for(let i=0;i<color.length;i++){
		let cur = color[i];
		let imgPath = chrome.runtime.getURL(`images/${cur}.svg`);
		ret += `<img alt="${cur}" src="${imgPath}" width="${fontSize}" height="${fontSize}" id='mtg-guild-clan-extension' style='margin:0px;padding:0px;'></img>`; //inline styling to prevent parent site's CSS overriding it
	}
	return ret;
}

function colorNames(){
	return [
	  'azorius', 'boros', 'dimir', 'golgari', 'gruul', 'izzet', 'orzhov', 'rakdos', 'selesnya', 'simic',
	  'abzan', 'bant', 'esper', 'grixis', 'jeskai', 'jund', 'mardu', 'naya', 'sultai', 'temur',
	  'glint', 'dune', 'ink', 'witch', 'yore'
	]; //Show guild symbol?
}

function disabledNames(){ //disable these names since these are common words
	return ['ink', 'witch'];
}

function nameToColorMap(){
	return {
		'azorius': 'WU',
		'azorious': 'WU', //handle mispelling of it
		'boros': 'RW',
		'dimir': 'UB',
		'golgari': 'BG',
		'gruul': 'RG',
		'izzet': 'UR',
		'orzhov': 'WB',
		'rakdos': 'BR',
		'selesnya': 'GW',
		'simic': 'GU',
		'abzan': 'WBG',
		'bant': 'GWU',
		'esper': 'WUB',
		'grixis': 'UBR',
		'jeskai': 'URW',
		'jund': 'BRG',
		'mardu': 'RWB',
		'naya': 'RGW',
		'sultai': 'BGU',
		'temur': 'GUR',
		'glint': 'UBRG',
		'dune': 'WBRG',
		'ink': 'WURG',
		'witch': 'WBUG',
		'yore': 'WBUR'
	};
}


