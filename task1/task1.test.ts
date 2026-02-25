import { validateUserName } from 'tasks/task1/index';
import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

jest.mock('tasks/task1/fetchIsUserNameValid');
const mockedFetchIsUserNameAvailable = jest.mocked(fetchIsUserNameAvailable);

describe('task1', () => {
  beforeEach(() => {
    mockedFetchIsUserNameAvailable.mockReset();
    mockedFetchIsUserNameAvailable.mockResolvedValue(true);
  });

  it('returns false if name has length less than 3 symbols', async () => {
    expect(await validateUserName('us')).toBe(false);
  });

  it('returns false if name contains non-alphanumeric symbol', async () => {
    expect(await validateUserName('user name')).toBe(false);
  });

  it('returns false if name starts with number', async () => {
    expect(await validateUserName('1username')).toBe(false);
  });

  it('returns false if name is not unique', async () => {
    mockedFetchIsUserNameAvailable.mockResolvedValue(false);

    expect(await validateUserName('username')).toBe(false);
  });

  it("doesn't make requests if name is not valid", async () => {
    await validateUserName('user name');

    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns false if fetchIsUserNameAvailable fails', async () => {
    mockedFetchIsUserNameAvailable.mockImplementation(() => {
      throw new Error();
    });
    await validateUserName('username');

    expect(mockedFetchIsUserNameAvailable).toThrow();
  });

  it('returns true if name is valid', async () => {
    expect(await validateUserName('username')).toBe(true);
  });
});
