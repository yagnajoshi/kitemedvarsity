
// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable, Injector } from '@angular/core';
import { CoreQuestionHandler } from '@core/question/providers/delegate';
import { AddonQtypeMultichoiceHandler } from '@addon/qtype/multichoice/providers/handler';
import { AddonQtypeMultichoiceComponent } from '@addon/qtype/multichoice/component/multichoice';

/**
 * Handler to support calculated multi question type.
 */
@Injectable()
export class AddonQtypeCalculatedMultiHandler implements CoreQuestionHandler {
    name = 'AddonQtypeCalculatedMulti';
    type = 'qtype_calculatedmulti';

    constructor(private multichoiceHandler: AddonQtypeMultichoiceHandler) { }

    /**
     * Return the Component to use to display the question.
     * It's recommended to return the class of the component, but you can also return an instance of the component.
     *
     * @param injector Injector.
     * @param question The question to render.
     * @return The component (or promise resolved with component) to use, undefined if not found.
     */
    getComponent(injector: Injector, question: any): any | Promise<any> {
        // Calculated multi behaves like a multichoice, use the same component.
        return AddonQtypeMultichoiceComponent;
    }

    /**
     * Check if a response is complete.
     *
     * @param question The question.
     * @param answers Object with the question answers (without prefix).
     * @return 1 if complete, 0 if not complete, -1 if cannot determine.
     */
    isCompleteResponse(question: any, answers: any): number {
        // This question type depends on multichoice.
        return this.multichoiceHandler.isCompleteResponseSingle(answers);
    }

    /**
     * Whether or not the handler is enabled on a site level.
     *
     * @return True or promise resolved with true if enabled.
     */
    isEnabled(): boolean | Promise<boolean> {
        return true;
    }

    /**
     * Check if a student has provided enough of an answer for the question to be graded automatically,
     * or whether it must be considered aborted.
     *
     * @param question The question.
     * @param answers Object with the question answers (without prefix).
     * @return 1 if gradable, 0 if not gradable, -1 if cannot determine.
     */
    isGradableResponse(question: any, answers: any): number {
        // This question type depends on multichoice.
        return this.multichoiceHandler.isGradableResponseSingle(answers);
    }

    /**
     * Check if two responses are the same.
     *
     * @param question Question.
     * @param prevAnswers Object with the previous question answers.
     * @param newAnswers Object with the new question answers.
     * @return Whether they're the same.
     */
    isSameResponse(question: any, prevAnswers: any, newAnswers: any): boolean {
        // This question type depends on multichoice.
        return this.multichoiceHandler.isSameResponseSingle(prevAnswers, newAnswers);
    }
}
