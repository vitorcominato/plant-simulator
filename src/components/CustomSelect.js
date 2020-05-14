/**
 * A Custom select input component
* */
const CustomSelect = {
  /**
   * @method loadOptions
   * @param options array of object with options that have to contain property value and label
   * @returns html with given options
   * Method that return html options for the build of select input
  * */
  loadOptions: (options) => {
    let hOptions = '';
    options.map((el) => {
      hOptions += `<option value="${el.value}">${el.label}</option>`;
      return true;
    });
    return hOptions;
  },

  render: async (options, id, label) => {
    const htmlOptions = CustomSelect.loadOptions(options);
    return `
      <div class="box-select">
        <label for="${id}" class="label-select">
          ${label}
        </label>
        <select class="custom-select" id="${id}">
          ${htmlOptions}
        </select>
        <i class="icon-arrow-down"></i>
      </div>
    `;
  },

  componentDidMount: async (id, onChange = () => {}) => {
    const select = document.getElementById(id);
    select.addEventListener('change', onChange);
  },
};

export default CustomSelect;
