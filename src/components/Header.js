/**
 * Header component of Green thumb
* */
const Header = {
  render: async () => {
    const view = `
      <header>
        <h1 class="logo">Green Thumb</h1>
        <h2 class="title-page">Find your next green friend</h2>
      </header>
    `;
    return view;
  },
};

export default Header;
