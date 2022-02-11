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

    skipIfSulfarasAppears(itemIndex){
        if (this.items[itemIndex].name == 'Sulfuras, Hand of Ragnaros'){
            return true
        }
    }

    updateAgedBrie(itemIndex){
        if (this.items[itemIndex].name == 'Aged Brie'){
            this.items[itemIndex].quality = this.items[itemIndex].quality + 1
            this.items[itemIndex].sellIn = - 1
            return true
        }
    }

    setMaximumQualityIfOverpassed(itemIndex){
        if (this.items[itemIndex].quality > 50){
            this.items[itemIndex].quality = 50
        }
    }

    increaseQualityOfBackstagePassesBeforeDate(itemIndex, increase){
        if (this.items[itemIndex].quality < 50) {
            this.items[itemIndex].quality = this.items[itemIndex].quality + increase
        }
    }

    backstageQualityUpdateWithinTime(itemIndex){
        if (this.items[itemIndex].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[itemIndex].sellIn < 11) {
                this.increaseQualityOfBackstagePassesBeforeDate(itemIndex, 2)
            }
            else if (this.items[itemIndex].sellIn < 6) {
                this.increaseQualityOfBackstagePassesBeforeDate(itemIndex, 3)
            }
            else if (this.items[itemIndex].sellIn < 1){
                this.items[itemIndex].quality = 0
            }
            this.items[itemIndex].sellIn = this.items[itemIndex].sellIn - 1
            return true
        }
    }

    setMinimumQualityIfBelowZero(itemIndex){
        if(this.items[itemIndex].quality < 0){
            this.items[itemIndex].quality = 0
        }
    }

    lowerQualityTwiceAsFast(itemIndex){
        if ((this.items[itemIndex].sellIn < 1 || this.items[itemIndex].name == 'Conjured') && this.items[itemIndex].name != 'Aged Brie'){
            this.items[itemIndex].quality = this.items[itemIndex].quality - 2
        }
    }

    lowerSellinByOne(itemIndex){
        this.items[itemIndex].sellIn = this.items[itemIndex].sellIn - 1
    }

    updateQuality() {
        for (let itemIndex = 0; itemIndex < this.items.length; itemIndex++) {
            if (this.skipIfSulfarasAppears(itemIndex) == true){
                continue
            }
            this.setMaximumQualityIfOverpassed(itemIndex)
            this.setMinimumQualityIfBelowZero(itemIndex)
            this.lowerQualityTwiceAsFast(itemIndex)
            if (this.updateAgedBrie(itemIndex)){
                continue
            }
            if (this.backstageQualityUpdateWithinTime(itemIndex) == true){
                continue
            }
            this.lowerSellinByOne(itemIndex)
        }
        return this.items;
    }
}
