/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  httpServiceMock,
  loggingSystemMock,
  httpResourcesMock,
} from '../../../../../src/core/server/mocks';
import { authenticationMock } from '../authentication/index.mock';
import { authorizationMock } from '../authorization/index.mock';
import { ConfigSchema, createConfig } from '../config';
import { licenseMock } from '../../common/licensing/index.mock';
import { sessionMock } from '../session_management/session.mock';
import { RouteDefinitionParams } from '.';
import { DeeplyMockedKeys } from '@kbn/utility-types/jest';

export const routeDefinitionParamsMock = {
  create: (config: Record<string, unknown> = {}) =>
    (({
      router: httpServiceMock.createRouter(),
      basePath: httpServiceMock.createBasePath(),
      csp: httpServiceMock.createSetupContract().csp,
      logger: loggingSystemMock.create().get(),
      config: createConfig(ConfigSchema.validate(config), loggingSystemMock.create().get(), {
        isTLSEnabled: false,
      }),
      authc: authenticationMock.create(),
      authz: authorizationMock.create(),
      license: licenseMock.create(),
      httpResources: httpResourcesMock.createRegistrar(),
      getFeatures: jest.fn(),
      getFeatureUsageService: jest.fn(),
      session: sessionMock.create(),
    } as unknown) as DeeplyMockedKeys<RouteDefinitionParams>),
};
