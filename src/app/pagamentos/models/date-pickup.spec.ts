import { DatePickup } from './date-pickup';

describe('DatePickup', () => {
  it('should create an instance', () => {
    expect(new DatePickup()).toBeTruthy();
  });

  it('construtor - com parâmetro - deve preencher corretamente', () => {
    const _mockDatePickup = new DatePickup({data: '21/01/2020', hora: '10:10'});
    expect(_mockDatePickup.data).toEqual('21/01/2020');
    expect(_mockDatePickup.hora).toEqual('10:10');
  });

  it('construtor - com parâmetro - deve ter os parâmetros default corretos', () => {
    const _mockDatePickup = new DatePickup();
    expect(_mockDatePickup.data).toEqual('');
    expect(_mockDatePickup.hora).toEqual('');
  });
});
