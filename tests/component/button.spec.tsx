import { expect, test } from "@playwright/experimental-ct-react";
import { Button } from "../../src/components/ui/button";

/**
 * Component Test: Button Component
 * Tests the button UI component in isolation
 */
test.describe("Button Component", () => {
  test("should render default button", async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toBeVisible();
    await expect(component).toContainText("Click me");
  });

  test("should handle click events", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click me
      </Button>,
    );

    await component.click();
    expect(clicked).toBe(true);
  });

  test("should render different variants", async ({ mount }) => {
    const variants = [
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
    ];

    for (const variant of variants) {
      const component = await mount(
        <Button variant={variant as any}>{variant} Button</Button>,
      );
      await expect(component).toBeVisible();
      await component.unmount();
    }
  });

  test("should render different sizes", async ({ mount }) => {
    const sizes = ["default", "sm", "lg", "icon"];

    for (const size of sizes) {
      const component = await mount(
        <Button size={size as any}>{size} Button</Button>,
      );
      await expect(component).toBeVisible();
      await component.unmount();
    }
  });

  test("should be disabled when disabled prop is true", async ({ mount }) => {
    const component = await mount(<Button disabled>Disabled</Button>);
    await expect(component).toBeDisabled();
  });

  test("should render as child component", async ({ mount }) => {
    const component = await mount(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText("Link Button");
  });
});
