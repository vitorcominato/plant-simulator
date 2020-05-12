import Header from '../components/Header';
import FormQuestions from '../components/FormQuestions';
import FormResult from '../components/FormResult';

const Home = {
  render: async () => {
    const header = await Header.render();
    await Header.componentDidMount();

    const formQuestions = await FormQuestions.render();
    await FormQuestions.componentDidMount();

    const formResult = await FormResult.render();
    await FormResult.componentDidMount();

    return `
      <main class="content">
        ${header}
        ${formQuestions}
        ${formResult}
      </main>
    `;
  },
  componentDidMount: async () => {
  },
};

export default Home;
