import program from 'commander';
import { createPovUseCase } from 'modules/pov/useCases/createPov';
import { CreatePovDTO } from 'modules/pov/useCases/createPov/createPovDTO';

require('dotenv').config();

async function run(arg: string, arg2: any) {
  console.log(arg, arg2);

  const dto = {} as CreatePovDTO;
  dto.net_worth = 0.12;
  dto.position_ratio = 0.7;
  dto.record_date = '2019-05-21';
  dto.szzs = 1000.5;
  const resultOrError = await createPovUseCase.execute(dto);
  if (resultOrError.isLeft()) {
    console.log(resultOrError.value);
  } else {
    console.log('插入成功');
  }
  return;
}
async function main() {
  program
    .version('0.1.0')
    .command('import <file>')
    .action(run);

  await program.parseAsync(process.argv);
}

main();
