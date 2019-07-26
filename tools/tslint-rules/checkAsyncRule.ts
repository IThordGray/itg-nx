import { isCallExpression } from '@babel/types';
import { hasModifier, IRuleMetadata, RuleFailure, Rules, WalkContext } from 'tslint/lib';
import { forEachChild, FunctionLikeDeclaration, Program, SourceFile, SyntaxKind, TypeChecker } from 'typescript/lib/typescript';

type CheckType = 'suffix' | 'prefix' | 'contains';

interface ICheckAsyncOptions {
    types: SyntaxKind[],
    checkType: CheckType,
    checkString: string
}

export class Rule extends Rules.TypedRule {

    static readonly metadata: IRuleMetadata = {
        ruleName: 'check-async',
        type: 'maintainability',
        description: `Ensures that all async functions and methods adhere to the same naming convention.`,
        options: {
            checkType: 'suffix' || 'prefix' || 'contains',
        },
        optionsDescription: 'Not configurable',
        rationale: `Not doing so will make me upset.`,
        typescriptOnly: false,
    };

    public static FAILURE_STRING(fnName: string, type: CheckType = 'suffix', checkString: string): string {
        switch (type) {
            case 'suffix': return `"${fnName}" is not suffixed with "${checkString}".`;
            case 'prefix': return `"${fnName}" is not prefixes with "${checkString}".`;
            case 'contains': return `"${fnName}" does not contain "${checkString}".`;
        }
    }

    public applyWithProgram(sourceFile: SourceFile, program: Program): RuleFailure[] {
        const [checkString, checkType] = this.ruleArguments;
        const options: ICheckAsyncOptions = {
            types: [SyntaxKind.FunctionDeclaration, SyntaxKind.MethodDeclaration],
            checkType: checkType,
            checkString: checkString
        };
        return this.applyWithFunction(
            sourceFile,
            walk,
            options,
            program.getTypeChecker()

        )
    }
}

function walk(ctx: WalkContext<ICheckAsyncOptions>, tc: TypeChecker) {
    const { sourceFile, options } = ctx;
    return forEachChild(sourceFile, function cb(node): void {

        const hasKind: boolean = options.types.some(o => o === node.kind);
        if (hasKind) {
            const declaration = node as any;

            switch (node.kind) {
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.FunctionDeclaration:
                    if (
                        hasModifier(node.modifiers, SyntaxKind.AsyncKeyword) &&
                        returnsPromise(declaration, tc) &&
                        !isCallExpression(declaration.body) &&
                        !declaration.name.escapedText.includes(options.checkString)
                    ) {
                        ctx.addFailure(
                            node.getStart(sourceFile),
                            (node as FunctionLikeDeclaration).body!.pos,
                            Rule.FAILURE_STRING(declaration.name.escapedText, options.checkType, options.checkString),
                        );
                    }
                // falls through
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    if (declaration.body === undefined) {
                        break;
                    }
            }
        }
        return forEachChild(node, cb);
    });
}

function returnsPromise(node: FunctionLikeDeclaration, tc: TypeChecker): boolean {
    const type = tc.getReturnTypeOfSignature(tc.getTypeAtLocation(node).getCallSignatures()[0]);
    return type.symbol !== undefined && type.symbol.name === "Promise";
}
