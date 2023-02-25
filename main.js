temp = []; assets = []; i_lang = -1;
function emi(id) { if (document.getElementById(id)) { return document.getElementById(id) } }
function percent(this_num, of_the) { return Math.round( (100 * this_num) / of_the ) }
function print(...msg) {
	var em = emi("terminal")
	msg.forEach(function(message) {
		if (em) {
			em.innerHTML = em.innerHTML + '['+time()+'] '+message
			em.appendChild(document.createElement('br'))
		}
		console.log('['+time()+'] '+message)
	})
}
function time() {
	var get_time = new Date()
	var hour = get_time.getHours()
	var min = get_time.getMinutes()
	var sec = get_time.getSeconds()
	if (hour.toString().length==1) {hour = '0'+hour}
	if (min.toString().length==1) {min = '0'+min}
	if (sec.toString().length==1) {sec = '0'+sec}
	return hour+":"+min+':'+sec
}
function fullscreen() {
	var em = document.body
	if ( !em.fs || em.fs === 'false' ) {
		if (em.requestFullscreen) { em.requestFullscreen() }
		else if (em.webkitRequestFullscreen) { em.webkitRequestFullscreen() }
		else if (em.msRequestFullscreen) { em.msRequestFullscreen() }
		em.fs = 'true'
	}
	else if ( em.fs === 'true' ) {
		if (document.exitFullscreen) { document.exitFullscreen() }
		else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
		else if (document.msExitFullscreen) { document.msExitFullscreen() }
		em.fs = 'false'
	}
}
function href(https, _b) {
	if (_b) { window.open(https, '_blank') }
	else { window.open(https, '_self') }
}
function pattern(CSSVar, val) { document.documentElement.style.setProperty('--'+CSSVar, val) }
function langs(name) {
	if (!name) {
		if (i_lang < lang_list.length-1) { i_lang++ } else { i_lang = 0 }
		lang = lang_list[i_lang]
	} else { lang = lang_list[name] }
	for (let sector in assets[lang]) {
		for (let i in assets[lang][sector]) {
			if ( emi(sector+i) ) { emi(sector+i).innerHTML = assets[lang][sector][i] }
		}
	}
	if (emi('lang')) { emi('lang').innerHTML = lang.toUpperCase() }
	emi('html').lang = lang
}
function vport(func_desktop, func_mobile) {
	let h = window.innerHeight
	let w = window.innerWidth
	if ( percent(h, w) > 100 ) { func_mobile() }
	else { func_desktop() }
}
function loadstring(str) {
	var script = document.createElement('script')
	script.id = 'loadstring-temp_script'
	script.innerHTML = str
	document.documentElement.appendChild(script)
	emi('loadstring-temp_script').remove()
}
function loadsheet(str) {
	var style = document.createElement('style')
	style.innerHTML = str
	document.documentElement.appendChild(style)
}
function slide(id, dir, _init) {
	// Create [slides] and slides[id] arrays if they doesn't exist
	if (typeof slides == 'undefined') { slides = {} }
	if (!slides[id] && _init) { slides[id]=[]; for (let i=0; i<(_init+1); i++) { slides[id].push(i) } }
	if (dir=='R') { // Change class for this [id] and switch to next
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]+1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		} else { // If next [id] doesn't exist, set index to 1 and change class
			slides[id][0] = 1
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		}
	}
	if (dir=='L') { // Change class for this [id] and switch to previous
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideL", "slideR")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]-1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		} else { // If previous [id] doesn't exist, set index to [max] and change class
			slides[id][0] = (slides[id].length-1)
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		}
	}
	// Check if [id] with [dir] index exists and change classes for this and selected [id]
	if (typeof dir=='number' && emi(id+dir)) {
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = dir
		emi(id+slides[id][0]).classList.remove("slided")
		emi(id+slides[id][0]).classList.add("slide")
	} //2022.11.05 :: Assigns 3 classes, clears animation states
}
function highlight(in_id, out_id) {
	var txt = emi(in_id).value
	var patterns = {
		esc: /<(.*?)>/, //...nevermind
		operator: [ '{', '}', '(', ')', '[', ']', ';', ',', '==', ' =', ': ', '-', '+', '.', ' > ', ' < ', ' / ' ],
		instructor: [ 'function', ' then', ' end', '	end', '\nend', 'if ', ' do', 'else', 'for ', 'while ', 'true', 'false', 'not ', ' or ', 'in ', ' and ', 'nil', 'local ', 'return ' ],
		lua_env: [ 'tostring', 'loadfile', 'table', 'ipairs', 'select', 'error', 'pairs', 'debug', 'package', 'io.', 'next', 'dofile', 'os.', '_G', '.create',
		'getmetatable', 'rawget', 'collectgarbage', 'xpcall', 'print', 'setmetatable', 'type', 'tonumber', 'rawequal', 'math', //'arg'
		'assert', 'rawlen', 'require', 'utf8', 'bit32', 'string', 'pcall', 'load', 'rawset', 'coroutine', '_VERSION', 'execute', '.write', 'load', 'clock' ],
		number: [ ' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9', ' 0', // '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
		'.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '.0', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-0',
		'(1', '(2', '(3', '(4', '(5', '(6', '(7', '(8', '(9', '(0', '1)', '2)', '3)', '4)', '5)', '6)', '7)', '8)', '9)', '0)',
		'[1', '[2', '[3', '[4', '[5', '[6', '[7', '[8', '[9', '[0', '1]', '2]', '3]', '4]', '5]', '6]', '7]', '8]', '9]', '0]', 
		'{1', '{2', '{3', '{4', '{5', '{6', '{7', '{8', '{9', '{0', '1}', '2}', '3}', '4}', '5}', '6}', '7}', '8}', '9}', '0}',
		],
	}
	
	txt = txt.replaceAll('-- ', '<x style="color:#fff">-- ')
	txt = txt.replaceAll('\n', '\n</x>')
	txt = txt.replaceAll('</x>end', 'end')
	
	patterns.number.forEach(function(i) {
		txt = txt.replaceAll(i, '<x style="color:#fc8">'+i+'</x>')
	})
	patterns.lua_env.forEach(function(i) {
		txt = txt.replaceAll(i, '<x style="color:#6af">'+i+'</x>')
	})
	patterns.operator.forEach(function(i) {
		txt = txt.replaceAll(i, '<x style="color:#f49">'+i+'</x>')
	})
	patterns.instructor.forEach(function(i) {
		txt = txt.replaceAll(i, '<x style="color:#f9f">'+i+'</x>')
	})
	
	txt = txt.replaceAll('\n', '<br>')
	txt = txt.replaceAll('	', '　　')
	
	emi(out_id).innerHTML = txt
}
function twemojiParse() { twemoji.parse(document.documentElement, {folder: 'svg', ext: '.svg'}) }
function doFile(str_name, str_data) {
	var link = document.createElement('a');
	link.download = str_name;
	var blob = new Blob([str_data], {type: 'text/plain'});
	link.href = window.URL.createObjectURL(blob);
	link.click(); link.remove()
}

function rawinput(ind) {
	emi('raw'+ind).value = emi('raw'+ind).value.replaceAll('  ', '	')
	emi('raw'+ind).value = emi('raw'+ind).value.replaceAll('.div.',
`<div class='' id='' style='' onclick=''>
	
</div>`)
	emi('raw'+ind).value = emi('raw'+ind).value.replaceAll('.p.',
`<p class='' id='' style='' onclick=''>
	
</p>`)
	emi('raw'+ind).value = emi('raw'+ind).value.replaceAll('.x.',
`<x style='' onclick=''>
	
</x>`)
	emi('raw'+ind).value = emi('raw'+ind).value.replaceAll('.css.',
`#_ {
	position: relative; float: left;
	left: auto; right: auto;
	width: 0vmin; height: 0vmin;
	padding: 0; margin: auto;
	background-color: #0000;
	color: #fff; font: var(--fontMain);
	border: 0vmin solid #0000;
	box-shadow: 0vmin 0vmin 0vmin #0000;
	border-radius: 0vmin;
	transition: 0.2s
}`)
}

rawdata = {
	html: {
		a: `<!DOCTYPE html> <html id='html' lang='en' dir='ltr'>
<head id='core'> <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" type="image/x-icon" href="assets/icon.ico">
	<title id="title">va2la_sample</title>
	<meta name='description' content='' />
	<meta name='keywords' content='' />
	<link rel="stylesheet" href="style.css">
</head>

<body id='body' onload='' tabIndex=0 onclick>
	<script src="main.js"></script>
	
`,
		b: ``,
		c: `
	
</body>
</html>`
	},
	css: {
		a: `/* Global embedded objects */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Inconsolata&family=Noto+Sans+JP:wght@300;400&family=Ubuntu&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap');

/* Global meta-objects */
::-webkit-scrollbar { width: 0; height: 0; background: #0000 }
:root {
	--accent: #fff;
	--accentSub: #fff;
}
::selection { background: var(--accent) }
::-moz-selection { background: var(--accent) }
html { scrollbar-width: none; scroll-padding-top: 10vmin; overflow-y: scroll }
body {
	font: var(--fontMain); z-index: -10;
	color: var(--accentFont); line-height: 1;
	width: 100vw; height: 100vh;
	background: #ccc; margin: 0;
	overscroll-behavior-x: none;
	overflow-x: hidden;
}

/* Global meta-classes */
.i { margin: auto }
.nil { pointer-events: none }
.nosel {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	user-drag: none; 
	-webkit-user-drag: none;
}
.bounded {
	overflow: hidden;
	overscroll-behavior-x: none;
	overscroll-behavior-y: none;
}
.break { float: left; width: 100%; height: 1px; margin: 0; display: block }
.center { display: flex; flex-wrap: wrap; justify-content: center }
.center p { margin: auto; text-align: center; overflow-wrap: break-word }
.fill { position: absolute; width: 100%; height: 100%; margin: 0 }
.text { font: inherit; color: inherit; text-decoration: none; border: none; outline: none }
.bgFill {
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
.bgCont {
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
.pixel {
	-ms-interpolation-mode: nearest-neighbor;
	image-rendering: crisp-edges;
	image-rendering: pixelated;
}
.ref {
	font: var(--fontRef); color: inherit;
	text-decoration: none; cursor: pointer;
	transition: color 0.2s
}
.ref:hover { color: var(--accent) }

/* Local objects */
`,
		b: ``,
	},
	js: {
		a: `// Presets by @eimirein - https://github.com/eimirein
temp = []; assets = []; i_lang = -1
function emi(id) { if (document.getElementById(id)) { return document.getElementById(id) } }
function percent(this_num, of_the) { return Math.round( (100 * this_num) / of_the ) }
function print(...msg) {
	var em = emi("log")
	msg.forEach(function(message) {
		if (em) {
			em.innerHTML = em.innerHTML + '['+time()+'] '+message
			em.appendChild(document.createElement('br'))
		}
		console.log('['+time()+'] '+message)
	})
}
function log(msg, lvl) {
	var em = emi("log")
	var levels = ['userdata', 'info', 'warning', 'error', 'crash']
	if (em) {
		em.innerHTML = em.innerHTML + '['+time()+'] <@'+levels[lvl || 0]+'> '+msg
		em.appendChild(document.createElement('br'))
	}
	console.log('['+time()+'] <@'+levels[lvl || 0]+'> '+msg)
}
function time() {
	var get_time = new Date()
	var hour = get_time.getHours()
	var min = get_time.getMinutes()
	var sec = get_time.getSeconds()
	if (hour.toString().length==1) {hour = '0'+hour}
	if (min.toString().length==1) {min = '0'+min}
	if (sec.toString().length==1) {sec = '0'+sec}
	return hour+":"+min+':'+sec
}
function fullscreen() {
	var em = document.body
	if ( !em.fs || em.fs === 'false' ) {
		if (em.requestFullscreen) { em.requestFullscreen() }
		else if (em.webkitRequestFullscreen) { em.webkitRequestFullscreen() }
		else if (em.msRequestFullscreen) { em.msRequestFullscreen() }
		em.fs = 'true'
	}
	else if ( em.fs === 'true' ) {
		if (document.exitFullscreen) { document.exitFullscreen() }
		else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
		else if (document.msExitFullscreen) { document.msExitFullscreen() }
		em.fs = 'false'
	}
}
function href(https, _b) {
	if (_b) { window.open(https, '_blank') }
	else { window.open(https, '_self') }
}
// ex: assets.lang = { title: { 1: 'a', 2: 'b' }, pgph: { 1: 'hi', 2: 'bye' } }
function langs(name) {
	if (!name) {
		if (i_lang < lang_list.length-1) { i_lang++ } else { i_lang = 0 }
		lang = lang_list[i_lang]
	} else { lang = lang_list[name] }
	for (let sector in assets[lang]) {
		for (let i in assets[lang][sector]) {
			if ( emi(sector+i) ) { emi(sector+i).innerHTML = assets[lang][sector][i] }
		}
	}
	if (emi('lang')) { emi('lang').innerHTML = lang.toUpperCase() }
	emi('html').lang = lang
}
// Set/change CSS variable
function pattern(CSSVar, val) { document.documentElement.style.setProperty('--'+CSSVar, val) }
// Scroll to an element
function scroll2(id) { emi(id).scrollIntoView() }
// Set functions for device type
function vport(func_desktop, func_mobile) {
	let h = window.innerHeight
	let w = window.innerWidth
	if ( percent(h, w) > 100 ) { func_mobile() }
	else { func_desktop() }
}

// Require a script into HTML
function require(source) {
	var script = document.createElement('script')
	script.src = source
	document.documentElement.appendChild(script)
}
// Load JS script / CSS sheet from a string
function loadstring(str) {
	var script = document.createElement('script')
	script.id = 'loadstring-temp_script'
	script.innerHTML = str
	document.documentElement.appendChild(script)
	emi('loadstring-temp_script').remove()
}
function loadsheet(str) {
	var style = document.createElement('style')
	style.innerHTML = str
	document.documentElement.appendChild(style)
}

// Copy text from an element to clipboard
function clip(id) {
	if ( emi(id) ) {
		navigator.clipboard.writeText(emi(id).textContent)
	} else { log('clip :: Element with id ['+id+'] does not exist', 1) }
}
// Insert text into an element
function type(id, txt) {
	if ( emi(id) ) {
		emi(id).appendChild(document.createTextNode(txt))
		emi(id).appendChild(document.createElement('br'))
	} else { log('type :: Element with id ['+id+'] does not exist', 1) }
}
// Erase text data of an element
function erase(id) {
	if ( emi(id) ) {
		emi(id).textContent = ''
	} else { log('erase :: Element with id ['+id+'] does not exist', 1) }
}
// Erase all internal data of an element
function wipe(id) {
	if ( emi(id) ) {
		emi(id).innerHTML = ''
	} else { log('wipe :: Element with id ['+id+'] does not exist', 1) }
}
// Remove one or multiple elements
function rm(...ids) {
	ids.forEach(function(id) {
		if ( emi(id) ) {
			emi(id).remove()
		} else { log('rm :: Element with id ['+id+'] does not exist', 1) }
	})
}
// Make one or multiple elements/write data within a specific root body
function mk(root_id, html_or_array) {
	root = emi(root_id)
	if ( root ) {
		if ( typeof html_or_array === 'object' ) {
			for (var index in html_or_array) {
				root.innerHTML = root.innerHTML + html_or_array[index]
			}
		} else { root.innerHTML = root.innerHTML + html_or_array }
	} else { log('mk :: Root element with id ['+root_id+'] does not exist', 1) }
}
// Change innerHTML data of a class
function cdata(_class, _data) {
	var items = document.getElementsByClassName(_class), i, len
	for (i = 0, len = items.length; i < len; i++) {
		items[i].innerHTML = _data
	}
}

// Animate an element, optionally add a second animation and set an interval
function a8(id, animation, a8opt, int_opt) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8opt && !int_opt ) { a8em.style.animation = animation }
		else {
			setInterval( function() { a8em.style.animation = animation }, int_opt )
			setInterval( function() { a8em.style.animation = a8opt }, int_opt*2 )
		}
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Add a switch-state expression to an element and assign 2 animations to it
function a8ss(id, a8A, a8B) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8em.value || a8em.value === 'false' ) {
			a8em.style.animation = a8A
			a8em.value = 'true'
		}
		else if ( a8em.value === 'true' ) {
			a8em.style.animation = a8B
			a8em.value = 'false'
		}
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Animate multiple objects on interval
// <str: name> Name for a loop; <int: interval> Execution interval (ms);
// <array: table> Array with element IDs; <str: a8x2> CSS Animations
function a8x(name, interval, table, a8show, a8hide) {
	if (!temp[name+'_i']) { temp[name+'_i'] = -1 } // Set [i] for loop
	if (!temp[name+'Switch']) { temp[name+'Switch'] = true } // Set a switch
	setInterval( function() {
		if ( temp[name+'Switch'] ) {
			if ( temp[name+'_i'] < table.length-1 ) {
				temp[name+'_i']++
				a8(table[ temp[name+'_i'] ], a8hide)
			} else {
				temp[name+'_i'] = table.length
				temp[name+'Switch'] = false
			} // {a, b, c} ex :: (0.hide[init]) -> 1.hide -> 2.hide -> false
		}
		if ( !temp[name+'Switch'] ) {
			if ( temp[name+'_i'] > 0 ) {
				temp[name+'_i']--
				a8(table[ temp[name+'_i'] ], a8show)
			} else {
				temp[name+'_i'] = 0
				temp[name+'Switch'] = true
				a8(table[ temp[name+'_i'] ], a8hide)
			} // {a, b, c} ex :: 2.show -> 1.show -> 0.show -> true -> 0.hide
		}
	}, interval) // P.S: Not gonna debug it, it's already huge and complicated
}

// Add a switch-state expression to an element and assign 2 functions to it
function trig(id, funcON, funcOFF) {
	em = emi(id)
	if (em) {
		if ( !em.state || em.state === 'OFF' ) {
			funcON()
			em.state = 'ON'
		}
		else if ( em.state === 'ON' ) {
			funcOFF()
			em.state = 'OFF'
		}
	}
	else { log('trig :: Element with id ['+id+'] does not exist', 1) }
}
// Slider widget function
//1. Create a bunch of elements | Ex: 3 divs with [id] 'cat1', 'cat2' and 'cat3'
//2. Initiate them in the body.onload() | Ex: slide('cat', 1, 3) or slide('cat', 'R', 3)
//3. Add selection function | Ex: <div class='EX' id='cat2' onclick="slide('cat', 2)"></div>
//4. Bind scroll function | Ex: <div id='nextCat' onclick="slide('cat', 'R')"></div>
//5. Set styles for given elements | Ex: .EX.slided {opacity: 0.2} ; .EX.slide {opacity: 1}
function slide(id, dir, _init) {
	// Create [slides] and slides[id] arrays if they doesn't exist
	if (typeof slides == 'undefined') { slides = {} }
	if (!slides[id] && _init) { slides[id]=[]; for (let i=0; i<(_init+1); i++) { slides[id].push(i) } }
	if (dir=='R') { // Change class for this [id] and switch to next
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]+1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		} else { // If next [id] doesn't exist, set index to 1 and change class
			slides[id][0] = 1
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		}
	}
	if (dir=='L') { // Change class for this [id] and switch to previous
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideL", "slideR")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]-1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		} else { // If previous [id] doesn't exist, set index to [max] and change class
			slides[id][0] = (slides[id].length-1)
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		}
	}
	// Check if [id] with [dir] index exists and change classes for this and selected [id]
	if (typeof dir=='number' && emi(id+dir)) {
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = dir
		emi(id+slides[id][0]).classList.remove("slided")
		emi(id+slides[id][0]).classList.add("slide")
	} //2022.11.05 :: Assigns 3 classes, clears animation states
}

// Scroll to top/bottom on call
function scroll_top(id) {
	if (id) { emi(id).scrollTop = 0 }
	else { window.scroll(0,0) }
}
function scroll_bottom(id) {
	if (id) { emi(id).scrollTop = emi(id).scrollHeight }
	else { window.scrollTo(0, document.body.scrollHeight) }
}
// Trigger a function/animation when an element is visible at a certain depth in px
function render() {
	var scr = document.querySelectorAll(".scr")
	for (var i = 0; i < scr.length; i++) {
		var windowHeight = window.innerHeight
		var elementTop = scr[i].getBoundingClientRect().top
		var elementVisible = 150
		if (elementTop < windowHeight - elementVisible) {
			scr[i].classList.add("rend")
		} else {
			scr[i].classList.remove("rend")
		}
	}
}
function doFile(str_name, str_data) {
	var link = document.createElement('a');
	link.download = str_name;
	var blob = new Blob([str_data], {type: 'text/plain'});
	link.href = window.URL.createObjectURL(blob);
	link.click(); link.remove()
}

// Window events
window.addEventListener("scroll", render); render()

`,
		b: ``,
	},
}
function init() {}
function parse() {
	emi('display').innerHTML = emi('raw1').value
	loadsheet( emi('raw2').value )
	loadstring( emi('raw3').value )
	twemojiParse()
}
function clearAll() {
	for (let i=0; i<4; i++) {
		if (emi('raw'+i)) { emi('raw'+i).value = '' }
	}
}
function save() {
	rawdata.html.b = emi('raw1').value
	rawdata.css.b = emi('raw2').value
	rawdata.js.b = emi('raw3').value
	var rawdatastring = '~~'+rawdata.html.b+'~~~~'+rawdata.css.b+'~~~~'+rawdata.js.b+'~~'
	doFile('index.html', rawdata.html.a+rawdata.html.b+rawdata.html.c)
	doFile('style.css', rawdata.css.a+rawdata.css.b)
	doFile('main.js', rawdata.js.a+rawdata.js.b)
	doFile('rawdata.txt', rawdatastring.replaceAll(/\n/g, '??'))
}
function loadRaw() {
	var rawstr = emi('raw1').value.match(/~~.*?~~/g)
	if (rawstr) {
	emi('raw1').value = rawstr[0].replaceAll(/\?\?/g, '\n').replaceAll('~~', '')
	emi('raw2').value = rawstr[1].replaceAll(/\?\?/g, '\n').replaceAll('~~', '')
	emi('raw3').value = rawstr[2].replaceAll(/\?\?/g, '\n').replaceAll('~~', '') }
}