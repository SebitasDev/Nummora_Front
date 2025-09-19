import { forMember, mapFrom } from '@automapper/core';

export const sameType = <TSource, TDestination, TField>(
    key: keyof TSource,
    destSelector: (dest: TDestination) => TField
) =>
    forMember(
        destSelector,
        mapFrom((src: TSource) => src[key] as TField)
    );
