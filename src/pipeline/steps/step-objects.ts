
export interface Key {
  key?: string;
}

export interface Label {
  label?: string
}

export interface Dependencies {
  depends_on?: null | Array<string | {step: string; allow_failure?: boolean;}>;
  allow_dependency_failure?: boolean;
}

export interface Conditional {
  if?: string;
}

export interface Branches {
  branches?: string | string[];
}

interface TextField {
  key: string;
  text: string;
  hint?: string;
  required?: boolean;
  default?: string;
}

interface SelectField {
  key: string;
  select: string;
  options: {
    label: string;
    value: string;
  }[]
  hint?: string;
  required?: boolean;
  default?: string;
  multiple?: boolean
}

export interface Prompt {
  prompt?: string;
  fields?: Array<SelectField | TextField>
}

export interface Skippable {
  skip?: boolean | string;
}