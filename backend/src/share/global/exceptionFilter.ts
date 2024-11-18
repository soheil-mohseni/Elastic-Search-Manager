import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { WithSentry } from '@sentry/nestjs';
import * as Sentry from '@sentry/node';


@Catch()
export class SentryFilter extends BaseExceptionFilter {
  @WithSentry()
  catch(exception: unknown, host: ArgumentsHost) {
    Sentry.captureException(exception);
    console.log(exception);
    
    return super.catch(exception, host)
  }
}
