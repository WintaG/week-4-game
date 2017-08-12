
/**
 * @fileoverview Custom functionality to apply throughout every adsize. This
 * has a dependency on common.js and utils.js
 */
var custom = (function() {

  /**
   * Classes which our JS hooks into. Add more class names as necessary.
   * @enum
   * @private
   */
  var elementClass_ = {
    item: 'js-item',
    itemName: 'js-item-name',
    itemPrice: 'js-item-price',
    itemSalePrice: 'js-item-saleprice',
    itemRegularPrice: 'js-item-regularprice',
    itemBar: 'js-item-bar',
    itemCtaOn: 'js-item-cta-on'
  };

  var elementId_ = {
    gpaDataProvider: 'gpa-data-provider'
  };

  /**
   * Initialization. Called from handleAdInitialized on each page.
   */
  function init() {
    utils.log('custom.init()');
    var data = common.getAdData();
    if (!data) return;

    // If you're using the swipe gallery to display feed items.
    //initItemsUsingGallery_();

    // If you're NOT using the swipe gallery to display feed items.
   initItemsWithoutGallery_();


  }

  /**
   * Find all items used in the swipe gallery and initialize custom behavior.
   * @private
   */
  function initItemsUsingGallery_() {
    var gallery = common.getGallery();

    // Apply settings to each item in the gallery
    var items = gallery.querySelectorAll('.' + elementClass_.item);
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      initItemDisplay_(item);
    }
  }

  /**
   * Find all items used outside the gallery and initialize custom behavior.
   * @private
   */
  function initItemsWithoutGallery_() {
    // Apply settings to each item
    var items = document.querySelectorAll('.' + elementClass_.item);
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      initItemDisplay_(item);
    }
  }

  /**
   * Set the display settings for each item.
   * Add any custom functionality you need applied on load.
   * @param {Element} item Item element.
   * @private
   */
  function initItemDisplay_(item) {

    // if you're using sales prices.
    //setSalePricesDisplay_(item);

    // Set mouseout.
    itemMouseOut(item);
  }

  /**
   * Sets the 3 price elements to display correctly when using sales price.
   * Find your price elements and set into common functionality.
   * @param {Element} item Item element.
   * @private
   */
  function setSalePricesDisplay_(item) {
    // Get reference to each price element.
    var itemPrice = item.querySelector('.' + elementClass_.itemPrice);
    var itemSalePrice = item.querySelector('.' + elementClass_.itemSalePrice);
    var itemRegularPrice = item.querySelector('.' + elementClass_.itemRegularPrice);

    // Sets each item to display correct prices.
    common.displayCorrectPrices(itemPrice, itemSalePrice, itemRegularPrice);
  }

  /**
   * Custom Item Mouse Interactions. Add your own behavior.
   */

  /**
   * Custom Mouseover interaction functionality.
   * @param {Element} item
   */
  function itemMouseOver(item) {
    var itemBar = item.querySelector('.' + elementClass_.itemBar);
    itemBar.style.opacity = 1;
    console.log("bar opacity is 1");
    var itemCtaOn = item.querySelector('.' + elementClass_.itemCtaOn);
    itemCtaOn.style.opacity = 1;
    console.log("cta opacity is 1");
  }

  /**
   * Custom Mouseout interaction functionality.
   * @param {Element} item
   */
  function itemMouseOut(item) {
    var itemBar = item.querySelector('.' + elementClass_.itemBar);
    itemBar.style.opacity = 0;
    console.log("bar opacity is 0");
    var itemCtaOn = item.querySelector('.' + elementClass_.itemCtaOn);
    itemCtaOn.style.opacity = 0;
    console.log("cta opacity is 0");

  }
/**
  * Transform data in price/subtitle/description based on feed
  */
 function transformDynamicData () {
   var dataProvider = document.querySelector('#' + elementId_.gpaDataProvider);
   dataProvider.addDataTransformer(function(dynamicData) {
     var data = dynamicData;
     if(data && data.Product) {
       console.log("has data and product data");
       for(var i = 0; i < data.Product.length; i++) {
         console.log("looping over products");
         if ( data.Product[i].name.indexOf("|") !== -1 ) {
           console.log("name has | in it");
           // transform origin/destination text
           dynamicData.Product[i].nameonly = data.Product[i].name.split('|')[0];
           dynamicData.Product[i].nameid = data.Product[i].name.split('|')[1];
         } else {
           dynamicData.Product[i].nameonly = data.Product[i].name;
         }
       }
     }
   });
 }

  return {
    init: init,
    itemMouseOver: itemMouseOver,
    itemMouseOut: itemMouseOut,
    transformDynamicData: transformDynamicData
  };

})();
