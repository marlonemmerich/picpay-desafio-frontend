import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('Nova instância - deve ter os valores corretos', () => {
    const user = new User();
    expect(user['id']).toBe(null);
    expect(user['name']).toBe('');
    expect(user['email']).toBe('');
    expect(user['password']).toBe('');
  });

});
