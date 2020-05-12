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
  componentDidMount: async () => {
  },
};

export default Header;
