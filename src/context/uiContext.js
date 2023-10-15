import { createContext } from "react";

const UIContext = createContext([
  {
    blocks: [
      {
        Category: "Smartwatch",
        Items: [
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/apple-watch-se-gps-cellular-40mm-starlight-aluminum-case-starlight-sport-band-mrfw3ll-a-a",
            Name: "Apple Watch SE (2nd Gen)",
            Price:
              "Starts at $8.33/mo\nfor 36 months, 0% APR\nRetail price: $299.99",
            URL: "https://www.verizon.com/connected-smartwatches/apple-watch-se-2nd-generation/",
          },
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/apple-watch-series-8-cellular-45mm-midnight-aluminum-midnight-sport-band-34fr-screen-usen-mnvl3ll-a",
            Name: "Apple Watch Series 8",
            Price:
              "Starts at $14.72/mo\nfor 36 months, 0% APR\nRetail price: $529.99",
            URL: "https://www.verizon.com/connected-smartwatches/apple-watch-series-8/",
          },
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/apple-watch-se-lte-40mm-starlight-aluminum-starlight-sport-band-sm-mntk3ll-a",
            Name: "Apple Watch SE (2nd Gen) (Certified Pre-Owned)",
            Price:
              "Starts at $7.91/mo\nfor 36 months, 0% APR\nRetail price: $284.99",
            URL: "https://www.verizon.com/connected-smartwatches/apple-watch-se-2nd-gen-certified-pre-owned/",
          },
        ],
      },
      {
        Category: "Tablet",
        Items: [
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/ipad-pro-cellular-11-in-silver-7-5g",
            Name: "Apple 11-inch iPad Pro (2021)",
            Price:
              "Starts at $27.77/mo\nfor 36 months, 0% APR\nRetail price: $999.99",
            URL: "https://www.verizon.com/tablets/apple-ipad-pro-11-2021",
          },
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/ipad-pro-11-in-cellular-silver",
            Name: "Apple 11-inch iPad Pro (2018) Certified Pre-Owned",
            Price:
              "Starts at $20.69/mo\nfor 36 months, 0% APR\nRetail price: $744.99",
            URL: "https://www.verizon.com/tablets/apple-11-inch-ipad-pro-2018-certified-pre-owned",
          },
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/ipad-pro-cellular-11-in-space-gray-5g",
            Name: "Apple 11-inch iPad Pro (2021) Certified Pre-Owned",
            Price:
              "Starts at $22.08/mo\nfor 36 months, 0% APR\nRetail price: $794.99",
            URL: "https://www.verizon.com/tablets/apple-11-inch-ipad-pro-2021-certified-pre-owned/",
          },
        ],
      },
      {
        Category: "Smartphone",
        Items: [
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-15-pro-1tb-natural-titanium-mtu53ll-a-a",
            Name: "Apple iPhone 15 Pro",
            Price:
              "Starts at $27.77/mo\nfor 36 months, 0% APR\nRetail price: $999.99",
            URL: "https://www.verizon.com/smartphones/apple-iphone-15-pro/",
          },
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-15-pro-max-256gb-natural-titanium-mu683ll-a-a",
            Name: "Apple iPhone 15 Pro Max",
            Price:
              "Starts at $33.33/mo\nfor 36 months, 0% APR\nRetail price: $1199.99",
            URL: "https://www.verizon.com/smartphones/apple-iphone-15-pro-max/",
          },
          {
            Brand: "Apple",
            ImageURL:
              "https://ss7.vzw.com/is/image/VerizonWireless/iphone-14-pro-gold-fall22-a",
            Name: "Apple iPhone 14 Pro",
            Price:
              "Starts at $0/mo\n$24.99/mo\nDetails\nfor 36 months, 0% APR\nRetail price: $899.99",
            URL: "https://www.verizon.com/smartphones/apple-iphone-14-pro/",
          },
        ],
      },
    ],
  },
  (obj) => obj,
]);

export default UIContext;
