import { Migration } from '@mikro-orm/migrations';

export class Migration20240529165118 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "email" text not null;');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_email_unique";');
    this.addSql('alter table "user" drop column "email";');
  }

}
