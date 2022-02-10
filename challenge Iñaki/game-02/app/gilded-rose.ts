export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;
    
    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let itemIndex = 0; itemIndex < this.items.length; itemIndex++) {
            if (this.items[itemIndex].name == 'Sulfuras, Hand of Ragnaros'){
                continue
            }

            /* Once the sell by date has passed, Quality degrades twice as fast + Conjured upgrade */
            if (this.items[itemIndex].sellIn < 1 || this.items[itemIndex].name == 'Conjured'){
                if (this.items[itemIndex].name != 'Aged Brie'){
                    this.items[itemIndex].quality = this.items[itemIndex].quality - 2
                }
            }

            if(this.items[itemIndex].quality < 0){
                this.items[itemIndex].quality = 0
            }

            if (this.items[itemIndex].name == 'Aged Brie'){
                this.items[itemIndex].quality = this.items[itemIndex].quality + 1
                this.items[itemIndex].sellIn = - 1
                continue
            }

            if (this.items[itemIndex].quality > 50){
                this.items[itemIndex].quality = 50
            }

            if (this.items[itemIndex].name == 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[itemIndex].sellIn < 11) {
                    if (this.items[itemIndex].quality < 50) {
                        this.items[itemIndex].quality = this.items[itemIndex].quality + 2
                    }
                }
                else if (this.items[itemIndex].sellIn < 6) {
                    if (this.items[itemIndex].quality < 50) {
                        this.items[itemIndex].quality = this.items[itemIndex].quality + 3
                    }
                }
                else if (this.items[itemIndex].sellIn < 1){
                    this.items[itemIndex].quality = 0
                }
                else{
                    this.items[itemIndex].sellIn = this.items[itemIndex].sellIn - 1
                }
                continue
            }

        
        this.items[itemIndex].sellIn = this.items[itemIndex].sellIn - 1
        }
        return this.items;
    }
}
