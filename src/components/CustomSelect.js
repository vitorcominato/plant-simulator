const CustomSelect = {
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
        <select class="custom-select" id="${id}">
          ${htmlOptions}
        </select>
        <label for="${id}" class="label-select">${label}</label>
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
