/**
 * Card component
* */
const Card = {
  render: (props) => {
    const {
      url,
      name,
      price,
      icons,
      order,
    } = props;
    let htmlIcons = '';
    icons.map((icon) => {
      htmlIcons += `<i class="icon-${icon}"></i>`;
      return true;
    });
    return `
        <li class="box-card">
          <div class="card data-order-${order}">
            <div class="box-img">
              <img class="card-img" src="${url}" alt="${name}">
            </div>
            <div class="box-info">
              <h4>${name}</h4>
              <p class="item-price">$${price}</p>
              <div class="icons">
                ${htmlIcons}
              </div>
            </div>
          </div>
        </li>
      `;
  },
};

export default Card;
