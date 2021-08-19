import Pagamento from "./pagamento.model";

describe('Pagamento', () => {
  it('should create an instance', () => {
    expect(new Pagamento()).toBeTruthy();
  });

  it('construtor - com parâmetro - deve preencher corretamente', () => {
    const _mockDatePickup = new Pagamento({
        id: 1,
        name: "Pennie Dumphries",
        username: "pdumphries0",
        title: "Dental Hygienist",
        value: 19.96,
        date: "2020-07-21T05:53",
        image: "https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1",
        isPayed: true
    });


    expect(_mockDatePickup.id).toEqual(1);
    expect(_mockDatePickup.name).toEqual("Pennie Dumphries");
    expect(_mockDatePickup.username).toEqual("pdumphries0");
    expect(_mockDatePickup.title).toEqual("Dental Hygienist");
    expect(_mockDatePickup.value).toEqual(19.96);
    expect(_mockDatePickup.date).toEqual("2020-07-21T05:53");
    expect(_mockDatePickup.image).toEqual("https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1");
    expect(_mockDatePickup.isPayed).toEqual(true);
  });

  it('construtor - com parâmetro - deve ter os parâmetros default corretos', () => {
    const _mockDatePickup = new Pagamento();
    expect(_mockDatePickup.id).toEqual(null);
    expect(_mockDatePickup.name).toEqual('');
    expect(_mockDatePickup.username).toEqual('');
    expect(_mockDatePickup.title).toEqual('');
    expect(_mockDatePickup.value).toEqual(undefined);
    expect(_mockDatePickup.date).toEqual('');
    expect(_mockDatePickup.image).toEqual('');
    expect(_mockDatePickup.isPayed).toEqual(false);
  });
});
