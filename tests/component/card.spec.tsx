import { expect, test } from "@playwright/experimental-ct-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";

/**
 * Component Test: Card Component
 * Tests the card UI component and its sub-components
 */
test.describe("Card Component", () => {
  test("should render card with all sections", async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>,
    );

    await expect(component).toBeVisible();
    await expect(component).toContainText("Card Title");
    await expect(component).toContainText("Card Description");
    await expect(component).toContainText("Card Content");
    await expect(component).toContainText("Card Footer");
  });

  test("should render minimal card", async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent>Simple content</CardContent>
      </Card>,
    );

    await expect(component).toBeVisible();
    await expect(component).toContainText("Simple content");
  });

  test("should apply custom className", async ({ mount }) => {
    const component = await mount(
      <Card className="custom-card">
        <CardContent>Content</CardContent>
      </Card>,
    );

    await expect(component).toHaveClass(/custom-card/);
  });
});
