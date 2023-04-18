import { Schema } from 'mongoose';
import Times from '../Domains/Times';
import TimesDomain from '../Domains/Times';
import TimesODM from '../Models/TimesODM';
import IPartidas from '../interfaces/IPartidas';
import ITimes from '../interfaces/ITimes';
import PartidasODM from '../Models/PartidasODM';

class TimesService {
  private createTimesDomains(time: ITimes) {
    return new TimesDomain(time);
  }

  private createArrayTimesDomains(time: ITimes[]) {
    const array = time.map((element) => new TimesDomain(element));
    return array;
  }

  public async createTimes(times: ITimes) {
    const timeODM = new TimesODM();
    try {
      const newTime = await timeODM.create(times);
      return this.createTimesDomains(newTime);
    } catch (error: unknown) {
        throw new Error('Esse time ja foi criado')
    }
  } 

  public async getTimes() {
    const timeODM = new TimesODM();
    const times = await timeODM.getAll();
    return this.createArrayTimesDomains(times);
  }
}

export default TimesService;
