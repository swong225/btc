module.exports = {
  drinkTypes: {
    milk: {
      key: 'milk',
      label: 'Milk Tea',
      subLabel: 'Hot or Cold',
      flavors: [
        { key: 'thai', label: 'Thai', img: 'thai' },
        { key: 'almond', label: 'Almond', img: 'almond' },
        { key: 'redBean', label: 'Red Bean', img: 'red_bean' },
        { key: 'mango', label: 'Mango', img: 'mango' },
        { key: 'taro', label: 'Taro', img: 'taro' }
      ],
      img: 'milk_tea'
    },
    juice: {
      key: 'juice',
      label: 'Juice Tea',
      subLabel: 'Hot or Cold',
      flavors: [
        { key: 'kiwi', label: 'Kiwi', img: 'kiwi' },
        { key: 'orange', label: 'Orange', img: 'orange' },
        { key: 'mango', label: 'Mango', img: 'mango' },
        { key: 'lychee', label: 'Lychee', img: 'lychee' },
        { key: 'peach', label: 'Peach', img: 'peach' }
      ],
      img: 'juice_tea'
    },
    smoothie: {
      key: 'smoothie',
      label: 'Smoothie',
      subLabel: 'No Tea',
      flavors: [
        { key: 'mocha', label: 'Mocha', img: 'mocha' },
        { key: 'peach', label: 'Peach', img: 'peach' },
        { key: 'mango', label: 'Mango', img: 'mango' },
        { key: 'taro', label: 'Taro', img: 'taro' },
      ],
      img: 'smoothie'
    }
  },
  sizes: {
    small: {
      key: 'small',
      label: 'Small',
      price: 3.50,
      oz: 12,
      img: 'small'
    },
    medium: {
      key: 'medium',
      label: 'Medium',
      price: 4.20,
      oz: 20,
      img: 'medium'
    },
    large: {
      key: 'large',
      label: 'Large',
      price: 4.75,
      oz: 32,
      img: 'large'
    }
  },
  availableTeas: {
    none: {
      key: 'none',
      label: 'No Tea',
      img: 'none'
    },
    black: {
      key: 'black',
      label: 'Black Tea',
      img: 'black_tea'
    },
    green: {
      key: 'green',
      label: 'Green Tea',
      img: 'green_tea'
    }
  },
  toppings: {
    pearls: {
      key: 'pearls',
      label: 'Pearls',
      price: 0.25,
      img: 'pearls'
    },
    lychee: {
      key: 'lychee',
      label: 'Lychee',
      price: 0.25,
      img: 'lychee_jelly'
    },
    protein: {
      key: 'protein',
      label: 'Protein',
      price: 0.25,
      img: 'protein'
    }
  }
}
