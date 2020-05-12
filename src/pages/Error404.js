const Error404 = {
  render: async () => `
    <section class="section">
        <h1> Página não encontrada </h1>
    </section>
  `,
  after_render: async () => {
  },
};
export default Error404;
