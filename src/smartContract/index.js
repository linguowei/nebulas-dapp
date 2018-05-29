'use strict';

var HolidayWishesContent = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		this.title = obj.title;
		this.content = obj.content;
		this.author = obj.author;
	} else {
    this.title = '';
    this.content = '';
    this.author = '';
	}
};

HolidayWishesContent.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

function holidayWishes() {
  LocalContractStorage.defineMapProperty(this, 'holidayWishesContentRepo');
}

holidayWishes.prototype = {

  init() {
    // todo
  },

  save(title, content) {

    title = title.trim();
    content = content.trim();
    if (title === '' || content === '') {
      throw new Error('标题和内容不能为空');
    }

    let holidayWishesTitle = this.holidayWishesContentRepo.get(title);
    if (holidayWishesTitle) {
      throw new Error('标题已存在');
    }

    const from = Blockchain.transaction.from;

    let holidayWishesContentItem = new HolidayWishesContent();
    holidayWishesContentItem.title = title;
    holidayWishesContentItem.content = content;
    holidayWishesContentItem.author = from;

    this.holidayWishesContentRepo.put(title, holidayWishesContentItem);
  },

  get(title) {
    return this.holidayWishesContentRepo.get(title);
  }
};

module.exports = holidayWishes;



