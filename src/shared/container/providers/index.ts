import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/dayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';


container.registerSingleton<IDateProvider>(
  "DayjsProvider",
  DayjsDateProvider
)
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider
)