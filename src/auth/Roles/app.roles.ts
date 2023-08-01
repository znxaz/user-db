import { RolesBuilder } from "nest-access-control";

export enum Roles {
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST"
}

export const roles: RolesBuilder = new  RolesBuilder();


roles.grant(Roles.GUEST)
.readOwn('profile')

roles.grant(Roles.USER)
.readAny('profile')
.updateOwn('profile');

roles.grant(Roles.ADMIN)
.readAny('profile')
.updateAny('profile')
.deleteAny('profile');

