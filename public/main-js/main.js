const sideMenuBtn = $('.bars'),
sideMenuVoid = $('.void'),
sideMenuContent= $('.side-menu-content'),
sideMenu = $('.side-menu'),
themer = $('.themer'),
theme = localStorage.getItem('theme'),
brandImg = $('.brand'),
prevBtn = $('.prev-btn'),
alertBox = $('.alert');

$(document).ready(function(){
	//menu btn
	$('.bars').on('click',function(){
		$(this).find('div').toggleClass('open');
		if (sideMenuBtn.hasClass('true')) {
			openSideMenu()
		} else{
			closeSideMenu()
		}
	});
	//menu content slide in
	sideMenuContent.find('li').on('hover',function () {
			// over
			sideMenu.removeClass('side-menu-close')
			sideMenu.removeClass('slide-out-right')
			sideMenuContent.addClass('content-slide-in-right slide-in-right')
			sideMenuContent.removeClass('content-slide-out-right slide-out-right')
		}, function () {
			// out
			if (sideMenuBtn.hasClass('true')) {				
				sideMenu.addClass('content-slide-out-right slide-out-right side-menu-close-')
				sideMenuContent.removeClass('content-slide-in-right slide-in-right')
				sideMenuContent.addClass('content-slide-out-right slide-out-right')
			}
		}
	);
	//close menu on link click
	sideMenuContent.find('li').on('click',function(){
		$(this).find('div').toggleClass('open');
		if (sideMenuBtn.hasClass('true')) {				
			sideMenu.addClass('content-slide-out-right slide-out-right side-menu-close-')
			sideMenuContent.removeClass('content-slide-in-right slide-in-right')
			sideMenuContent.addClass('content-slide-out-right slide-out-right')
		} else {
			closeSideMenu()
		}
	});
	//set theme
	if (theme == 'light') {
		lightTheme()
	} else if (theme == 'dark') {
		darkTheme()
	}
	themer.on('click', () => {
		setTheme()
	})
	//previous page btn 
	prevBtn.on('click',() => {
		prevPage()
	})
});

const openSideMenu = function() {
	sideMenu.removeClass('side-menu-close')
	sideMenu.removeClass('slide-out-right')
	sideMenuBtn.removeClass('true')
	setTimeout(() => {
		sideMenuVoid.addClass('slide-in-right')
		sideMenuVoid.removeClass('slide-out-right')
	}, 50);
	setTimeout(() => {
		sideMenuContent.addClass('content-slide-in-right slide-in-right')
		sideMenuContent.removeClass('content-slide-out-right slide-out-right')
	}, 100);
	},
	closeSideMenu = function () {
	sideMenu.addClass('content-slide-out-right slide-out-right side-menu-close-')
	sideMenuBtn.addClass('true')
	sideMenuBtn.find('div').removeClass('open')
	setTimeout(() => {
		sideMenuVoid.removeClass('slide-in-right')
		sideMenuVoid.addClass('slide-out-right')
	}, 50);
	setTimeout(() => {
		sideMenuContent.removeClass('content-slide-in-right slide-in-right')
		sideMenuContent.addClass('content-slide-out-right slide-out-right')
	}, 100);
	},
	darkTheme = function () {
		$(this).find('i').removeClass('fa-cloud-moon').addClass('fa-cloud-sun')
		$('body').addClass('theme-dark').removeClass('theme-light')
		localStorage.setItem('theme', 'dark')
		brandImg.attr('src', 'img/logo/white logo.png')
	},
	lightTheme = function () {
		$(this).find('i').removeClass('fa-cloud-sun').addClass('fa-cloud-moon')
		$('body').addClass('theme-light').removeClass('theme-dark')
		localStorage.setItem('theme', 'light')
		brandImg.attr('src', 'img/logo/black logo.png')
	},
	setTheme = function () {
		if ($('body').hasClass('theme-light')) {
			localStorage.setItem('theme', 'dark')
			darkTheme()
			themer.removeClass('true')
		} else {
			localStorage.setItem('theme', 'theme')
			lightTheme()
			themer.addClass('true')
		}
	},
	prevPage = function () {
		window.history.back()
	};