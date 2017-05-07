var testFlag = true;

jQuery(document).ready(function () {
	jQuery(document).on('scroll', function () {
		if(jQuery('#btnScrollToTop').hasClass('hidden') && jQuery(this).scrollTop() > 200) {
			jQuery('#btnScrollToTop').removeClass('hidden');
		} else if(!jQuery('#btnScrollToTop').hasClass('hidden') && jQuery(this).scrollTop() <= 200) {
			jQuery('#btnScrollToTop').addClass('hidden');
		}
	});

    var sliderElements = jQuery('div.gallery-wrapper a.fancybox');
    if (sliderElements.length > 0) {
        var slideCount = sliderElements.length;
        var slideWidth = sliderElements.outerWidth(true);

        var sliderUlWidth = slideWidth * slideCount;

        var nPoint = parseInt(sliderElements.parent().parent().innerWidth() / sliderElements.find('img').outerWidth());
        jQuery('div.gallery-wrapper a.fancybox:nth-child(' + nPoint + ')').addClass('point');
        jQuery('div.gallery-wrapper').css({width: sliderUlWidth});

        jQuery('a.gallery-prev').click(function () {
            var target = jQuery(this).siblings('div.gallery-wrapper');
            moveLeft(target);
        });

        jQuery('a.gallery-next').click(function () {
            var target = jQuery(this).siblings('div.gallery-wrapper');
            moveRight(target);
        });

        var promoboxSlide = false;
        function moveLeft(object) {
            var left = object.css('left');
            left = (typeof left !== 'undefined') ? parseInt(left.substr(0, left.length - 2)) : 0;
            if (left < 0 && !promoboxSlide) {
                object.siblings('a.gallery-next').removeClass('stop');
                var point = object.find('.point');
                point.removeClass('point');
                point.prev().addClass('point');
                promoboxSlide = true;
                object.animate({
                    left: '+=' + slideWidth
                }, 200, function () {
                    promoboxSlide = false;
                    if ((left + slideWidth) >= 0)
                        object.siblings('a.gallery-prev').addClass('stop');
                });
            }
        }

        function moveRight(object) {
            var lastChild = object.find('a.fancybox:last-of-type');
            if (!lastChild.hasClass('point') && !promoboxSlide) {
                object.siblings('a.gallery-prev').removeClass('stop');
                var point = object.find('.point');
                point.removeClass('point');
                point.next().addClass('point');
                promoboxSlide = true;
                object.animate({
                    left: '-=' + slideWidth
                }, 200, function () {
                    promoboxSlide = false;
                    var lastChild = object.find('a.fancybox:last-child');
                    if (lastChild.hasClass('point'))
                        object.siblings('a.gallery-next').addClass('stop');
                });
            }
        }
    }
	
	/*
	jQuery('div.product-search > select').on('change', function () {
		var successFunction = { start: function (response) {
				var obj = jQuery('div.product-search').parent();
				obj.find('#categories-dropdown').html( jQuery(response).find('#categories-dropdown').html() );
				obj.find('#subcategories-dropdown').html( jQuery(response).find('#subcategories-dropdown').html() );
				obj.find('#producer-dropdown').html( jQuery(response).find('#producer-dropdown').html() );
			}
		}
		ajaxTemplate(jQuery(this).parent(), (testFlag ? '/tehnoprah' : '')+'/search-selection-change-ajaxcall', (jQuery(this)[0].id == 'subcategories-dropdown' || jQuery(this)[0].id == 'producer-dropdown'), successFunction);
	});
	
	jQuery('div.product-search > button').click(function () {
		var successFunction = { start: function (products) {
				products = JSON.parse(products);
				var allProducts = jQuery('#all-products');
				allProducts.children().remove();
				var i = 0;
				var productsHTML = '';
				var productRow = '';
				for( var productKey in products ) {
					var productItem = products[productKey];
					if(i%2 == 0) {
						productRow = jQuery('<div class="product-row"></div>');
					}
					var tmpProduct = jQuery('<div class="product"></div>');
					tmpProduct.append(jQuery('<h3>'+productItem.title+'</h3>'));
					tmpProduct.append(jQuery('<img src="'+productItem.imgSrc+'" alt="'+((productItem.imgAlt) ? productItem.imgAlt : '')+'" title="'+((productItem.imgTitle) ? productItem.imgTitle : '')+'" />'));
					tmpProduct.append(jQuery((productItem.body) ? productItem.body : ''));
					var tmpSendInquiryButton = jQuery('<a class="send-inquiry">'+Drupal.t('Send request')+'</a>');
					tmpSendInquiryButton.click( function () {
						jQuery('#contact-form #subject').val(Drupal.t('Request for: ')+jQuery(this).siblings('h3').text());
						jQuery('div.container div.popup-wrapper').addClass('visible');
					});
					tmpProduct.append(tmpSendInquiryButton);
					tmpProduct.append(jQuery('<a class="product-details" href="'+productItem.productLink+'">'+Drupal.t('Product details')+'</a>'));
					productRow.append(tmpProduct);
					if(i%2 == 1) {
						allProducts.append(productRow);
					}
					++i;
				}
				if(i%2 == 1) {
					productRow.append(jQuery('<div class="product empty-spot">&nbsp;</div>'));
					allProducts.append(productRow);
				}
			}
		}
		
		ajaxTemplate(jQuery(this).parent(), (testFlag ? '/tehnoprah' : '')+'/sort-products-ajaxcall', true, successFunction, true);
	});
	*/
	jQuery('a.send-inquiry').click( function () {
		jQuery('#contact-form input[type="text"], #contact-form input[type="email"], #contact-form textarea').each(function () {
			jQuery(this).val('');
			jQuery(this).text('');
		});
		jQuery('#contact-form .invalid, #contact-form .errorMsg').each(function () {
			jQuery(this).removeClass('invalid');
			jQuery(this).attr('style', false);
		});
		jQuery('#contact-form #subject').val(Drupal.t('Request for: ')+(jQuery(this).siblings('input[type="hidden"]').length > 0 ? jQuery(this).siblings('input[type="hidden"]').val() : jQuery('#product h2').text()));
		jQuery('div.container div.popup-wrapper').addClass('visible');
	});
	
	jQuery('button#close-btn').click( function (e) {
		e.preventDefault();
		jQuery('div.container div.popup-wrapper').removeClass('visible');
	});
	
	jQuery('#contact-article-form #name, #contact-form #name').val(jQuery('#user_full_name').text());
	jQuery('#contact-article-form #email, #contact-form #email').val(jQuery('#user_email').text());
	
	jQuery('button#send-email-btn').click( function () {
		var allInputs = jQuery('table.email-form input, table.email-form textarea');
		var sendFlag = true;
		allInputs.each( function () {
			if(jQuery(this)[0].type != 'submit')
				sendFlag &= validate_form_element_general(jQuery(this));
		});
		if( sendFlag ) {
			jQuery.ajax({
				url: (testFlag ? '/tehnoprah' : '')+'/send-email-ajaxcall?name='+encodeURIComponent(jQuery('table.email-form #name').val())
					+'&email='+encodeURIComponent(jQuery('table.email-form #email').val())
					+'&subject='+encodeURIComponent(jQuery('table.email-form #subject').val())
					+'&body='+encodeURIComponent(jQuery('table.email-form #body').val())
					+'&url='+encodeURIComponent(window.location.href),
				async: true,
				type: "GET",
				success: function (data) {
					alert(data);
					jQuery('div.container div.popup-wrapper').removeClass('visible');
				}
			});
		}
	});
	
	jQuery('ul.menu li.menuparent').mouseover( function () {
		var submenu = jQuery(this).children('ul')[0];
		submenu = jQuery(submenu);
		var newHeight = 0;
		submenu.children().each( function () {
			newHeight += jQuery(this).height();
		});
		submenu.css('height', newHeight+'px');
	});
	
	jQuery('ul.menu li.menuparent').mouseleave( function () {
		var submenu = jQuery(this).children('ul')[0];
		submenu = jQuery(submenu);
		submenu.css('height', '0px');
	});
	
	jQuery('#home-page-items-container .items-row').each( function () {
		var maxHeight = 0;
		jQuery(this).find('img').each(function () {
			if( jQuery(this).height() > maxHeight ) {
				maxHeight = jQuery(this).height();
			}
		});
		maxHeight += 30;
		jQuery(this).find('img').each(function () {
			jQuery(this).css('padding', ((maxHeight-jQuery(this).height())/2)+'px 0');
		});
	});
	
	if(jQuery('#edit-field-category-und').length) {
		jQuery.ajax({
			url: (testFlag ? '/tehnoprah' : '')+'/admin-subcategories-ajax?category='+jQuery('#edit-field-category-und').val(),
			async: true,
			type: "POST",
			success: function (data) {
				data = JSON.parse(data);
				jQuery('#edit-field-subcategory-und option').each(function (){
					jQuery(this).css('display', 'none');
				});
				jQuery('#edit-field-subcategory-und option').each(function (){
					for( var i in data ) {
						if(jQuery(this).attr('value') == data[i]) {
							jQuery(this).css('display', '');
							break;
						}
					}
				});
			},
			error: function (e) {
				console.log(e);
			}
		});
	}
	
	jQuery('#edit-field-category-und').change( function () {
		jQuery.ajax({
			url: (testFlag ? '/tehnoprah' : '')+'/admin-subcategories-ajax?category='+jQuery('#edit-field-category-und').val(),
			async: true,
			type: "POST",
			success: function (data) {
				data = JSON.parse(data);
				jQuery('#edit-field-subcategory-und option').each(function (){
					jQuery(this).css('display', 'none');
					jQuery(this).removeAttr('selected');
				});
				jQuery('#edit-field-subcategory-und option').each(function (){
					for( var i in data ) {
						if(jQuery(this).attr('value') == data[i]) {
							if(i == 0) {
								jQuery(this).attr('selected', 'selected');
							}
							jQuery(this).css('display', '');
							break;
						}
					}
				});
			},
			error: function (e) {
				console.log(e);
			}
		});
	});
	
	var contLeft = 0;
	homepageSlider(jQuery('#homepage-container .brand-container'));
	jQuery('#homepage-container .brand-container').mouseover(function () {
		jQuery(this).stop(true, false);
		contLeft = jQuery(this).css('left');
		contLeft = (typeof contLeft !== 'undefined') ? parseInt(contLeft.substr(0, contLeft.length - 2)) : 0;
	});
	jQuery('#homepage-container .brand-container').mouseleave(function () {
		homepageSlider(jQuery(this), contLeft);
	});
	
	jQuery('.language-select > ul > li > img').click(function () {
		jQuery.ajax({
			url: (testFlag ? '/tehnoprah' : '')+'/change-language-ajaxcall?language='+jQuery(this).parent().attr('data-language')+'&nid='+jQuery(this).parent().attr('data-nid'),
			async: true,
			type: "GET",
			success: function (url) {
				window.location.href = url;
			}
		});
	});
	
	jQuery('form.main-search').submit(function (e) {
		e.preventDefault();
		jQuery.ajax({
			url: '/site-search-ajaxcall?qstr='+jQuery('#main-search-qstr').val()+'&lang='+window.location.pathname.slice(1, 3),
			type: 'GET',
			beforeSend: function () {
				var overlay = jQuery('<div class="overlay"></div>');
				overlay.append(jQuery('<div class="loader">Loading...</div>'));
				jQuery('body').append(overlay);
			},
			success: function (data) {
				data = JSON.parse(data);
				var resultList = jQuery('<ul class="search-results"></ul>');
				if(typeof data['results'] != 'undefined' && data['results'].length > 0) {
					for( var i in data['results'] ) {
						resultList.append('<li><a href="'+data['results'][i]['URL']+'">'+data['results'][i]['title']+'</a></li>');
					}
				} else {
					resultList = jQuery('<p>'+Drupal.t('Nema rezultata za traženi pojam.')+'</p>');
				}
				jQuery('body').find('.overlay').remove();
				jQuery('#block-system-main').children().remove();
				jQuery('#block-system-main').append(jQuery('<h2>'+Drupal.t('Rezultati pretraživanja')+'</h2>'));
				jQuery('#block-system-main').append(resultList);
			}
		});
	});
});

function homepageSlider(cont, contLeft) {
	if(typeof contLeft == 'undefined') {
		contLeft = 0;
	}
	if(cont.children().first().outerWidth() <= 30) {
		setTimeout( function() { homepageSlider(cont); }, 1000 );
	} else {
		cont.animate({
			left: -(cont.children().first().outerWidth()+contLeft)
		}, (cont.children().first().outerWidth()+contLeft)*35, 'linear', function () {
			var firstToLast = cont.children().first();
			cont.children().first().remove();
			cont.append(firstToLast);
			cont.css('left', '10px');
			homepageSlider(cont);
		});
	}
}

function ajaxTemplate(obj, path, subcategoryChange, onSuccessFunc, loaderFlag) {
	var flag = false;
	if( obj.find('#categories-dropdown option:selected').attr('key') > 0 ) {
		path += '?category=' + obj.find('#categories-dropdown option:selected').attr('key');
		flag = true;
	}
	if( obj.find('#subcategories-dropdown option:selected').attr('key') > 0 && subcategoryChange ) {
		if (flag)
			path += '&';
		else
			path += '?'; 
		path += 'subcategory=' + obj.find('#subcategories-dropdown option:selected').attr('key');
		flag = true;
	}
	if( obj.find('#producer-dropdown option:selected').attr('key') != 0 ) {
		if (flag)
			path += '&';
		else
			path += '?'; 
		path += 'producer=' + obj.find('#producer-dropdown').val();
	}
	
	if( loaderFlag ) {
		var overlay = jQuery('<div class="overlay"></div>');
		overlay.append(jQuery('<div class="loader">Loading...</div>'));
		obj.append(overlay);
	}
	var result = '';
    jQuery.ajax({
        url: path,
        async: true,
        type: "GET",
        success: function (data) {
			if( onSuccessFunc ) {
				onSuccessFunc.start(data);
			} else {
				result = data;
			}
			obj.find('.overlay').remove();
        },
		error: function () {
			alert(Drupal.t('Error occured while accessing data!'));
			obj.find('.overlay').remove();
		}
    });
	return result;
}

function validate_form_element_general(element) {
    var flag = true;
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
    //if (element.hasClass('req'))
    //{
        if (element.val() == '') {
            element.addClass('invalid');
            flag = false;
            element.siblings('.errorMsg').css('display', 'block');
        }
        else {
            if (element.attr('type') == 'email') {
                if (!pattern.test(element.val())) {
                    element.addClass('invalid');
                    flag = false;
                    element.siblings('.errorMsg').css('display', 'block');
                }
                else {
                    element.removeClass('invalid');
                    flag = true;
                    element.siblings('.errorMsg').css('display', 'none');
                }
            }

            else {
                element.removeClass('invalid');
                flag = true;
                element.siblings('.errorMsg').css('display', 'none');
            }
        }
    //}
    return flag;
}