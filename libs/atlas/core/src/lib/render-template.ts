import { EmbeddedViewRef, inject, NgZone, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

export class RenderData {
  model: unknown;
  index?: number;
  elementContainer?: Element;
}

export function injectRenderTemplate() {
  const zone = inject(NgZone);
  const viewContainerRef = inject(ViewContainerRef);
  const templateRef = inject(TemplateRef<unknown>);
  const renderer = inject(Renderer2);

  function renderTemplate({ index, model, elementContainer }: RenderData): EmbeddedViewRef<unknown> {
    const childView = viewContainerRef.createEmbeddedView(templateRef, {
      index: index ?? 0,
      $implicit: model,
    });
    if (elementContainer) {
      childView.rootNodes.forEach((element) => {
        renderer.appendChild(elementContainer, element);
      });
    }
    return childView;
  }

  return (renderData: RenderData): unknown[] => {
    let childView: EmbeddedViewRef<unknown>;
    if (zone.isStable) {
      childView = zone.run(() => renderTemplate(renderData));
    } else {
      childView = renderTemplate(renderData);
    }

    childView.detectChanges();
    return childView.rootNodes;
  };
}
