/*
 * MIT License
 *
 * Copyright (c) 2020 Dataline
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package io.dataline.server.handlers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.google.common.collect.Sets;
import io.dataline.api.model.DestinationIdRequestBody;
import io.dataline.api.model.DestinationSpecificationRead;
import io.dataline.config.DestinationConnectionSpecification;
import io.dataline.config.persistence.ConfigPersistence;
import io.dataline.config.persistence.JsonValidationException;
import io.dataline.config.persistence.PersistenceConfigType;
import io.dataline.server.helpers.DestinationSpecificationHelpers;
import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DestinationSpecificationsHandlerTest {

  private ConfigPersistence configPersistence;
  private DestinationConnectionSpecification destinationConnectionSpecification;
  private DestinationSpecificationsHandler destinationSpecificationHandler;

  @BeforeEach
  void setUp() throws IOException {
    configPersistence = mock(ConfigPersistence.class);
    destinationConnectionSpecification =
        DestinationSpecificationHelpers.generateDestinationSpecification();
    destinationSpecificationHandler = new DestinationSpecificationsHandler(configPersistence);
  }

  @Test
  void testGetDestinationSpecification() throws JsonValidationException {
    when(configPersistence.getConfigs(
            PersistenceConfigType.DESTINATION_CONNECTION_SPECIFICATION,
            DestinationConnectionSpecification.class))
        .thenReturn(Sets.newHashSet(destinationConnectionSpecification));

    DestinationSpecificationRead expectedDestinationSpecificationRead =
        new DestinationSpecificationRead();
    expectedDestinationSpecificationRead.setDestinationId(
        destinationConnectionSpecification.getDestinationId());
    expectedDestinationSpecificationRead.setDestinationSpecificationId(
        destinationConnectionSpecification.getDestinationSpecificationId());
    expectedDestinationSpecificationRead.setConnectionSpecification(
        destinationConnectionSpecification.getSpecificationJson());

    final DestinationIdRequestBody destinationIdRequestBody = new DestinationIdRequestBody();
    destinationIdRequestBody.setDestinationId(
        expectedDestinationSpecificationRead.getDestinationId());

    final DestinationSpecificationRead actualDestinationSpecificationRead =
        destinationSpecificationHandler.getDestinationSpecification(destinationIdRequestBody);

    assertEquals(expectedDestinationSpecificationRead, actualDestinationSpecificationRead);
  }
}
