import CustomSelect from './CustomSelect';
import FormResult from './FormResult';
import Card from './Card';

/**
 * Component that renders green thumb form
* */
const FormQuestions = {
  getPlantApi: {
    endPoint: 'https://6nrr6n9l50.execute-api.us-east-1.amazonaws.com/default/front-plantTest-service',
    methodParams: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  },
  questionValues: {
    light: '',
    water: '',
    pet: '',
  },
  icons: {
    toxicity: {
      true: 'toxic',
      false: 'non-toxic',
    },
    sun: {
      no: 'no-sun',
      low: 'low-sun',
      high: 'high-sun',
    },
    water: {
      rarely: 'onde-drop',
      regularly: 'two-drops',
      daily: 'three-drops',
    },
  },


  /**
   * @method changeSelect
   * @param event event trggered from select change
   * Fire when CustomSelect component changes value
  * */
  changeSelect: (event) => {
    const { id } = event.target;
    const fieldName = id.split('-')[1];
    FormQuestions.questionValues[fieldName] = event.target.value;
    FormQuestions.checkFields();
  },

  /**
   * @method getPlants
   * Call method from endpoint to get plants
  * */
  getPlants: async () => {
    const { getPlantApi, questionValues } = FormQuestions;
    const { endPoint, methodParams } = getPlantApi;
    const { light, water, pet } = questionValues;
    try {
      const response = await fetch(`${endPoint}?sun=${light}&water=${water}&pets=${pet}`, methodParams);
      const json = await response.json();
      return json;
    } catch (err) {
      return false;
    }
  },

  /**
   * @method iconsCard
   * @param plantProps object returned from api method
   * @returns a array of strings
   * Method that returns icons passad
  * */
  iconsCard: (plantProps) => {
    const iconsCard = [];
    iconsCard.push(FormQuestions.icons.water[plantProps.water]);
    iconsCard.push(FormQuestions.icons.sun[plantProps.sun]);
    iconsCard.push(FormQuestions.icons.toxicity[plantProps.toxicity]);

    return iconsCard;
  },

  /**
   * @method renderPlants
   * @param plants array returned from api method
   * Method that render the cards
  * */
  renderPlants: async (plants) => {
    const DOMResultSection = document.getElementById('result-section');
    let allCards = '';
    plants.map((plantElement, index) => {
      const icons = FormQuestions.iconsCard(plantElement);
      const cardPlant = Card.render({
        ...plantElement,
        order: index,
        icons,
      });
      allCards += cardPlant;
      return true;
    });
    document.getElementById('result-cards').innerHTML = await allCards;
    await FormResult.setWidthSwiper(plants.length);
    await DOMResultSection.scrollIntoView();
  },

  /**
   * @method checkFields
   * Check if all fields are filled than proceed to call api mehtod
  * */
  checkFields: async () => {
    const keysQuestions = Object.keys(FormQuestions.questionValues);
    let hasEmptyValue = false;

    keysQuestions.map((el) => {
      if (!FormQuestions.questionValues[el]) {
        hasEmptyValue = true;
      }
      return true;
    });
    const DOMDataEmpty = document.getElementById('data-empty');
    const DOMDataResult = document.getElementById('data-result');
    const DOMLoading = document.getElementById('loading');

    if (hasEmptyValue) {
      return false;
    }

    DOMDataEmpty.classList.add('hide');
    DOMDataResult.classList.add('hide');
    DOMLoading.classList.remove('hide');

    const plants = await FormQuestions.getPlants();
    DOMLoading.classList.add('hide');

    if (plants.length > 0) {
      DOMDataResult.classList.remove('hide');
      FormQuestions.renderPlants(plants);
      DOMDataEmpty.classList.add('hide');
      DOMDataResult.classList.remove('hide');
    } else {
      DOMDataEmpty.classList.remove('hide');
    }

    return true;
  },

  render: async () => {
    const lightOptions = [
      {
        label: 'Select...',
        value: '',
      },
      {
        label: 'No sunlight',
        value: 'no',
      },
      {
        label: 'Low sunlight',
        value: 'low',
      },
      {
        label: 'High sunlight',
        value: 'high',
      },
    ];
    const lightSelect = await CustomSelect.render(
      lightOptions,
      'slc-light',
      '<b>2.</b> Set the amount of <b>sunlight</b> your plant will get.',
    );

    const waterOptions = [
      {
        label: 'Select...',
        value: '',
      },
      {
        label: 'Rarely',
        value: 'rarely',
      },
      {
        label: 'Regularly',
        value: 'regularly',
      },
      {
        label: 'Daily',
        value: 'daily',
      },
    ];
    const waterSelect = await CustomSelect.render(
      waterOptions,
      'slc-water',
      '<b>2.</b> How often do you want to <b>water</b> your plant?',
    );

    const petOptions = [
      {
        label: 'Select...',
        value: '',
      },
      {
        label: 'No/They don\'t care',
        value: 'false',
      },
      {
        label: 'Yes',
        value: 'true',
      },
    ];

    const petSelect = await CustomSelect.render(
      petOptions,
      'slc-pet',
      '<b>3.</b> Do you have pets? Do they <b>chew</b> plants?',
    );
    return `
      <section class="form-question">
          <ul class="form-list">
            <li>
              <img src="/assets/images/sun.png" alt="Sun">
              ${lightSelect}
            </li>
            <li>
              <img src="/assets/images/wateringcan.png" alt="Watering Can">
              ${waterSelect}
            </li>
            <li>
              <img src="/assets/images/dog.png" alt="Dog">
              ${petSelect}
            </li>
          </ul>
      </section>
    `;
  },
  componentDidMount: async () => {
    CustomSelect.componentDidMount('slc-pet', FormQuestions.changeSelect);
    CustomSelect.componentDidMount('slc-water', FormQuestions.changeSelect);
    CustomSelect.componentDidMount('slc-light', FormQuestions.changeSelect);
  },
};

export default FormQuestions;
