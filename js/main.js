/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
(function() {

	var viewEl = document.querySelector('.view'),
		gridEl = viewEl.querySelector('.grid'),
		items = [].slice.call(gridEl.querySelectorAll('.product')),
		basket;

	// the compare basket
	function CompareBasket() {
		this.el = document.querySelector('.compare-basket');
		this.compareCtrl = this.el.querySelector('.action--compare');
		this.compareWrapper = document.querySelector('.compare'),
		this.closeCompareCtrl = this.compareWrapper.querySelector('.action--close')
		
		this.itemsAllowed = 3;
		this.totalItems = 0;
		this.items = [];

		// compares items in the compare basket: opens the compare products wrapper
		this.compareCtrl.addEventListener('click', this._compareItems.bind(this));
		// close the compare products wrapper
		var self = this;
		this.closeCompareCtrl.addEventListener('click', function() {
			// toggle compare basket
			classie.add(self.el, 'compare-basket--active');
			// animate..
			classie.remove(viewEl, 'view--compare');
		});
	}

	CompareBasket.prototype.add = function(item) {
		// check limit
		if( this.isFull() ) {
			return false;
		}

		classie.add(item, 'product--selected');

		// create item preview element
		var preview = this._createItemPreview(item);
		// prepend it to the basket
		this.el.insertBefore(preview, this.el.childNodes[0]);
		// insert item
		this.items.push(preview);

		this.totalItems++;
		if( this.isFull() ) {
			classie.add(this.el, 'compare-basket--full');
		}

		classie.add(this.el, 'compare-basket--active');
	};

	CompareBasket.prototype._createItemPreview = function(item) {
		var self = this;

		var preview = document.createElement('div');
		preview.className = 'product-icon';
		preview.setAttribute('data-idx', items.indexOf(item));
		
		var removeCtrl = document.createElement('button');
		removeCtrl.className = 'action action--remove';
		removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action__text action__text--invisible">Remove product</span>';
		removeCtrl.addEventListener('click', function() {
			self.remove(item);
		});
		
		var productImageEl = item.querySelector('img.product__image').cloneNode(true);

		preview.appendChild(productImageEl);
		preview.appendChild(removeCtrl);

		var productInfo = item.querySelector('.product__info').innerHTML;
		// var productInfo = document.getElementById("original").innerHTML;
		//var productInfo = .innerHTML;
		//console.log("is",productInfo);
		//var productInfo = ""
		preview.setAttribute('data-info', productInfo);

		return preview;
	};

	CompareBasket.prototype.remove = function(item) {
		classie.remove(this.el, 'compare-basket--full');
		classie.remove(item, 'product--selected');
		var preview = this.el.querySelector('[data-idx = "' + items.indexOf(item) + '"]');
		this.el.removeChild(preview);
		this.totalItems--;

		var indexRemove = this.items.indexOf(preview);
		this.items.splice(indexRemove, 1);

		if( this.totalItems === 0 ) {
			classie.remove(this.el, 'compare-basket--active');
		}

		// checkbox
		var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
		if( checkbox.checked ) {
			checkbox.checked = false;
		}
	};

	CompareBasket.prototype._compareItems = function() {
		var self = this;

		// remove all previous items inside the compareWrapper element
		[].slice.call(this.compareWrapper.querySelectorAll('div.compare__item')).forEach(function(item) {
			self.compareWrapper.removeChild(item);
		});

		for(var i = 0; i < this.totalItems; ++i) {
			console.log("comparing");
			var compareItemWrapper = document.createElement('div');
			compareItemWrapper.setAttribute('style','overflow:auto');
			compareItemWrapper.className = 'compare__item';

			var compareItemEffectEl = document.createElement('div');
			compareItemEffectEl.setAttribute('style','overflow:auto');
			compareItemEffectEl.className = 'compare__effect';

			compareItemEffectEl.innerHTML = this.items[i].getAttribute('data-info');

			//var title1 = document.createElement('p');
			//var title2 = document.createElement('p');
			//var t = document.createTextNode("RISK FACTOR BREAKDOWN");
			//var t2 = document.createTextNode("RETURN BREAKDOWN");
			
			//title1.appendChild(t);
			//title2.appendChild(t2);

			//title1 = "";
			//var title2 = document.createElement('p');
			//title2 = "";
			/*var risk_img = document.createElement('img');
			var risk_img1 = document.createElement('img');
			var br = document.createElement('br');
			risk_img.src = "images/det.png";
			risk_img1.src = "images/risk.png";*/
			

			/*var risk_img1 = document.createElement('img');
			var risk_img3 = document.createElement('img');
			var br = document.createElement('br');
			
			risk_img1.src = "images/risk12.png";
			risk_img3.src = "images/risk12.png";
			risk_img.style.width = "450px"
			risk_img3.style.width = "450px"
			risk_img1.style.width = "450px"
			var risk_img2 = document.createElement('img');
			risk_img2.src = "images/risk2.png";
			risk_img2.style.width = "450px"*/
			var a = document.createElement('a');
			//a.text =' DETAILED ANALYSIS'
			

			
			a.href = "table_try.html";
			a.appendChild(compareItemEffectEl);
			//document.body.appendChild(a);
			compareItemWrapper.appendChild(a);
			/*compareItemWrapper.appendChild(br);
			compareItemWrapper.appendChild(a);
			compareItemWrapper.appendChild(br);
			compareItemWrapper.appendChild(risk_img);
			compareItemWrapper.appendChild(risk_img1);*/

			/*compareItemWrapper.appendChild(title1);
			
			compareItemWrapper.appendChild(risk_img3);
			compareItemWrapper.appendChild(br);
			compareItemWrapper.appendChild(br);
			compareItemWrapper.appendChild(title2);
			compareItemWrapper.appendChild(risk_img2);
			compareItemWrapper.appendChild(risk_img1);
			compareItemWrapper.appendChild(br);
			compareItemWrapper.appendChild(a);*/

			this.compareWrapper.insertBefore(compareItemWrapper, this.compareWrapper.childNodes[0]);
		}

		setTimeout(function() {
			// toggle compare basket
			classie.remove(self.el, 'compare-basket--active');
			// animate..
			classie.add(viewEl, 'view--compare');
		}, 25);
	};

	CompareBasket.prototype.isFull = function() {
		return this.totalItems === this.itemsAllowed;
	};

	function init() {
		// initialize an empty basket
		basket = new CompareBasket();
		initEvents();
	}

	function initEvents() {
		items.forEach(function(item) {
			var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
			checkbox.checked = false;

			// ctrl to add to the "compare basket"
			checkbox.addEventListener('click', function(ev) {
				if( ev.target.checked ) {
					if( basket.isFull() ) {
						ev.preventDefault();
						return false;
					}
					basket.add(item);
				}
				else {
					basket.remove(item);
				}
			});
		});
	}


	init();
	function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

})();