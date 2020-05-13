import Header from '../components/Header';
import FormQuestions from '../components/FormQuestions';
import FormResult from '../components/FormResult';

const Home = {
  render: async () => {
    const header = await Header.render();
    const formQuestions = await FormQuestions.render();
    const formResult = await FormResult.render();

    return `
      <section class="top-content" id="top-content">
        <div class="container">
          ${header}
          ${formQuestions}
        </div>
      </section>
      <section class="bottom-content">
        <div class="container">
          ${formResult}
        </div>
      </section>
    `;
  },
  componentDidMount: async () => {
    Header.componentDidMount();
    FormQuestions.componentDidMount();
    FormResult.componentDidMount();
  },
};

export default Home;
