import { mount } from '@vue/test-utils';
import FleetManager from '../components/FleetManager.vue';

const mockData = {
  machines: [
    { id: 1, type: 'excavator', make: 'Volvo', active: true, location: { N: 1, E: 2, H: 3 } },
    { id: 2, type: 'dozer', make: 'Caterpillar', active: false, location: { N: 4, E: 5, H: 6 } },
  ],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe('FleetManager', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FleetManager);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('fetches data and renders list correctly', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.list li').length).toBe(2);
  });

  it('selects machine when clicked', async () => {
    await wrapper.vm.$nextTick();
    const machineItem = wrapper.findAll('.list li').at(0);
    await machineItem.trigger('click');
    expect(wrapper.vm.selectedMachine).toEqual(mockData.machines[0]);
  });

  it('deselects machine when clicked again', async () => {
    await wrapper.vm.$nextTick();
    const machineItem = wrapper.findAll('.list li').at(0);
    await machineItem.trigger('click');
    await machineItem.trigger('click');
    expect(wrapper.vm.selectedMachine).toBeNull();
  });

  it('renders machine details when a machine is selected', async () => {
    await wrapper.vm.$nextTick();
    const machineItem = wrapper.findAll('.list li').at(0);
    await machineItem.trigger('click');
    expect(wrapper.find('.details').text()).toContain('Machine Details');
  });

  it('renders "No selection" when no machine is selected', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.details').text()).toContain('No selection');
  });

  it('fetches data from API when fetchData method is called', async () => {
    await wrapper.vm.fetchData();
    expect(wrapper.vm.machines).toEqual(mockData.machines);
  });
});
